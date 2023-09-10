import { Cloudinary } from '@cloudinary/url-gen'
import { format } from '@cloudinary/url-gen/actions/delivery'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { webp } from '@cloudinary/url-gen/qualifiers/format'
import { CLOUDINARY_URL, MEDIA_TYPES } from '~/lib/constants'

interface Props {
  mediaUrl: string
  type: 'images' | 'videos' | 'avatars'
}

export const uploadMedia = async ({ mediaUrl, type }: Props) => {
  let folder = ''

  if (type === MEDIA_TYPES.IMAGES) folder = 'threads-clone/thread-images'
  if (type === MEDIA_TYPES.VIDEOS) folder = 'threads-clone/thread-videos'
  if (type === MEDIA_TYPES.AVATARS) folder = 'threads-clone/user-avatars'

  const body = {
    file: mediaUrl,
    upload_preset: 'threads-clone',
    folder
  }

  try {
    const response = await fetch(CLOUDINARY_URL, {
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

    const myImage = cloudinary.image(data.public_id)

    const transformedImage = myImage
      .resize(
        scale()
          .width(640)
          .aspectRatio(data.width / data.height)
      )
      .delivery(format(webp()))

    return {
      url: transformedImage.toURL(),
      width: data.width,
      height: data.height
    }
  } catch (error) {
    console.error(error)
  }
}
