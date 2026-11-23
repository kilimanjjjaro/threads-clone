import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { CLOUDINARY_CLOUD_NAME, MEDIA_TYPES } from '~/lib/constants'
import { logError } from '~/lib/utils/logger'
import { cloudinaryApiOrigin } from '~/lib/utils/origins'

const DELIVERY_WIDTH = 600
const DELIVERY_QUALITY = 70

interface Props {
  mediaUrl: string
  type: string
}

interface UploadResponse {
  public_id: string
  width: number
  height: number
}

export const uploadMedia = async ({ mediaUrl, type }: Props) => {
  let body = {}
  let cloudinaryUrl = ''
  let folder = ''
  const uploadApi = `${cloudinaryApiOrigin()}/v1_1/${CLOUDINARY_CLOUD_NAME}`

  if (type === MEDIA_TYPES.IMAGE) folder = 'threads-clone/thread-images'
  if (type === MEDIA_TYPES.VIDEO) folder = 'threads-clone/thread-videos'
  if (type === MEDIA_TYPES.AVATAR) folder = 'threads-clone/user-avatars'

  if (type === MEDIA_TYPES.IMAGE || type === MEDIA_TYPES.AVATAR) {
    cloudinaryUrl = `${uploadApi}/image/upload`

    body = {
      file: mediaUrl,
      upload_preset: 'threads-clone-images',
      folder
    }
  }

  if (type === MEDIA_TYPES.VIDEO) {
    cloudinaryUrl = `${uploadApi}/video/upload`

    body = {
      file: mediaUrl,
      upload_preset: 'threads-clone-videos',
      folder
    }
  }

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- the cloudinary response is not validated at runtime
    const data = await (response.json() as Promise<UploadResponse>)

    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: CLOUDINARY_CLOUD_NAME
      },
      url: {
        secure: true
      }
    })

    const isVideo = type === MEDIA_TYPES.VIDEO
    const asset = isVideo
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
      type: isVideo ? MEDIA_TYPES.VIDEO : MEDIA_TYPES.IMAGE
    }
  } catch (error) {
    logError(error)
    return undefined
  }
}
