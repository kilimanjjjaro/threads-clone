import { server$ } from '@builder.io/qwik-city'
import { CLOUDINARY_URL } from '~/lib/constants'

export const uploadAvatar = server$(async (avatarUrl: string) => {
  const body = {
    file: avatarUrl,
    upload_preset: 'threads-clone',
    folder: 'threads-clone/avatars'
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
