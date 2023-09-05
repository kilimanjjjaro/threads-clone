import { server$ } from '@builder.io/qwik-city'
import { CLOUDINARY_URL } from '~/lib/constants'

export const uploadMedia = server$(async (url: string) => {
  const body = {
    file: url,
    upload_preset: 'threads-clone',
    folder: 'threads-clone/thread-media'
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

    const opmitizedMedia: string = data.secure_url

    return opmitizedMedia
  } catch (error) {
    console.error(error)
  }
})
