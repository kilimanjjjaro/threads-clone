import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { CLOUDINARY_CLOUD_NAME, MEDIA_TYPES } from '~/lib/constants'
import { cloudinaryApiOrigin } from '~/lib/utils/origins'

interface Props {
  mediaUrl: string
  type: string
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

    const data = await response.json()

    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: CLOUDINARY_CLOUD_NAME
      },
      url: {
        secure: true
      }
    })

    if (type === MEDIA_TYPES.VIDEO) {
      const video = cloudinary.video(data.public_id)

      const transformedVideo = video
        .resize(
          scale()
            .width(600)
            .aspectRatio(data.width / data.height)
        )
        .quality(70)

      return {
        url: transformedVideo.toURL(),
        width: data.width,
        height: data.height,
        type: MEDIA_TYPES.VIDEO
      }
    } else {
      const image = cloudinary.image(data.public_id)

      const transformedImage = image
        .resize(
          scale()
            .width(600)
            .aspectRatio(data.width / data.height)
        )
        .quality(70)

      return {
        url: transformedImage.toURL(),
        width: data.width,
        height: data.height,
        type: MEDIA_TYPES.IMAGE
      }
    }
  } catch (error) {
    console.error(error)
  }
}
