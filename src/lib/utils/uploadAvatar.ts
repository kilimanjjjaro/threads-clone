import { server$ } from '@builder.io/qwik-city'
import axios from 'axios'

export const uploadAvatar = server$(async (avatarUrl: string) => {
  const data = {
    file: avatarUrl,
    upload_preset: 'wrkload-avatar',
    folder: 'threads-clone/avatars'
  }

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dfzzgyj7r/image/upload',
      data,
      {
        withCredentials: false
      }
    )

    const optimizedAvatar = response.data.secure_url

    return optimizedAvatar
  } catch (error) {
    console.error(error)
  }
})
