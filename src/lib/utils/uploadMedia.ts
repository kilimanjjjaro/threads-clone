import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { CLOUDINARY_CLOUD_NAME, MEDIA_TYPES } from '~/lib/constants'
import { isUploadResponse } from '~/lib/utils/guards'
import { logError } from '~/lib/utils/logger'
import { cloudinaryApiOrigin } from '~/lib/utils/origins'

const DELIVERY_WIDTH = 600
const DELIVERY_QUALITY = 70

interface Props {
  mediaUrl: string
  type: string
}

interface UploadTarget {
  resource: 'image' | 'video'
  preset: string
  folder: string
}

const UPLOAD_TARGETS: Partial<Record<string, UploadTarget>> = {
  [MEDIA_TYPES.IMAGE]: {
    resource: 'image',
    preset: 'threads-clone-images',
    folder: 'threads-clone/thread-images'
  },
  [MEDIA_TYPES.AVATAR]: {
    resource: 'image',
    preset: 'threads-clone-images',
    folder: 'threads-clone/user-avatars'
  },
  [MEDIA_TYPES.VIDEO]: {
    resource: 'video',
    preset: 'threads-clone-videos',
    folder: 'threads-clone/thread-videos'
  }
}

const cloudinary = new Cloudinary({
  cloud: { cloudName: CLOUDINARY_CLOUD_NAME },
  url: { secure: true }
})

export const uploadMedia = async ({ mediaUrl, type }: Props) => {
  const { [type]: target } = UPLOAD_TARGETS

  if (target === undefined) return undefined

  const { resource, preset, folder } = target

  try {
    const response = await fetch(
      `${cloudinaryApiOrigin()}/v1_1/${CLOUDINARY_CLOUD_NAME}/${resource}/upload`,
      {
        method: 'POST',
        body: JSON.stringify({ file: mediaUrl, upload_preset: preset, folder }),
        headers: { 'content-type': 'application/json' }
      }
    )

    const data: unknown = await response.json()

    if (!isUploadResponse(data)) return undefined

    const asset =
      resource === 'video'
        ? cloudinary.video(data.public_id)
        : cloudinary.image(data.public_id)

    const transformedAsset = asset
      .resize(
        scale()
          .width(DELIVERY_WIDTH)
          .aspectRatio(data.width / data.height)
      )
      .quality(DELIVERY_QUALITY)

    return {
      url: transformedAsset.toURL(),
      width: data.width,
      height: data.height,
      type: resource === 'video' ? MEDIA_TYPES.VIDEO : MEDIA_TYPES.IMAGE
    }
  } catch (error) {
    logError(error)
    return undefined
  }
}
