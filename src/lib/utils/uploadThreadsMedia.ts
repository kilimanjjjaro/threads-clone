import { server$ } from '@builder.io/qwik-city'
import { CLOUDINARY_URL } from '~/lib/constants'

export const uploadThreadsMedia = server$(async (mediaUrl: string) => {
  const body = {
    file: mediaUrl,
    upload_preset: 'threads-clone',
    folder: 'threads-clone/threads-media'
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

    const optimizedAvatar: string = data.secure_url

    return optimizedAvatar
  } catch (error) {
    console.error(error)
  }
})
