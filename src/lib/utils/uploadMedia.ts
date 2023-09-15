import { Cloudinary } from '@cloudinary/url-gen'
import { format } from '@cloudinary/url-gen/actions/delivery'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { webp, videoWebm } from '@cloudinary/url-gen/qualifiers/format'
import { CLOUDINARY_URL, MEDIA_TYPES } from '~/lib/constants'

interface Props {
  mediaUrl: string
  type: string
}

export const uploadMedia = async ({ mediaUrl, type }: Props) => {
  let body = {}
  let cloudinaryUrl = ''
  let folder = ''

  if (type === MEDIA_TYPES.IMAGE) folder = 'threads-clone/thread-images'
  if (type === MEDIA_TYPES.VIDEO) folder = 'threads-clone/thread-videos'
  if (type === MEDIA_TYPES.AVATAR) folder = 'threads-clone/user-avatars'

  if (type === MEDIA_TYPES.IMAGE || type === MEDIA_TYPES.AVATAR) {
    cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dfzzgyj7r/image/upload'

    body = {
      file: mediaUrl,
      upload_preset: 'threads-clone-images',
      folder
    }
  }

  if (type === MEDIA_TYPES.VIDEO) {
    cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dfzzgyj7r/video/upload'

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
        cloudName: 'dfzzgyj7r'
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
