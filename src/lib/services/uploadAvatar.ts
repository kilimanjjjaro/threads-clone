import cloudinary from 'cloudinary'

export default async function uploadAvatar(avatarUrl: string) {
  const options = {
    upload_preset: 'wrkload-avatar',
    folder: 'threads-clone/avatars'
  }

  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    const response = await cloudinary.v2.uploader.upload(avatarUrl, options)

    const optimizedAvatar = response.eager[0].secure_url

    return optimizedAvatar
  } catch (error) {
    console.error(error)
  }
}
