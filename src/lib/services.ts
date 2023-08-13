import axios from 'axios'
import cloudinary from 'cloudinary'
import {
  ENDPOINTS_DOCUMENT_ID,
  GRAPHQL_ENDPOINT,
  THREADS_APP_ID
} from '~/lib/constants'
import { type FullUserData } from '~/lib/types'

const uploadAvatar = async (file: string) => {
  const data = {
    file,
    upload_preset: 'wrkload-avatar',
    folder: 'threads-clone/avatars'
  }

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  try {
    const response = await cloudinary.v2.uploader.upload(file, data)

    return response.eager[0].secure_url
  } catch (error) {
    console.log(error)
  }
}

const mapUserData = async (rawResponse: FullUserData) => {
  const userApiResponse = rawResponse?.data?.userData?.user

  if (!userApiResponse) return null

  const hasBioLinks = userApiResponse.bio_links.some((link) => link.url !== '')

  const data = {
    id: userApiResponse.pk,
    username: userApiResponse.username,
    biography: userApiResponse.biography,
    isVerified: userApiResponse.is_verified,
    followerCount: userApiResponse.follower_count,
    bioLinks: hasBioLinks ? userApiResponse.bio_links : [],
    fullName: userApiResponse.full_name,
    profilePicture: await uploadAvatar(userApiResponse.profile_pic_url)
  }

  return data
}

const fetchData = async ({
  documentId,
  variables
}: {
  documentId: number
  variables: { userID: string }
}) => {
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'user-agent': 'Threads clone by kilimanjjjaro.com',
    'x-ig-app-id': THREADS_APP_ID,
    'x-fb-lsd': 'jdFoLBsUcm9h-j90PeanuC'
  }

  const body = `lsd=jdFoLBsUcm9h-j90PeanuC&jazoest=21926&variables=${JSON.stringify(
    variables
  )}&doc_id=${documentId}`

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, body, { headers })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getUserId = async ({ username }: { username?: string }) => {
  const response = await axios.get(`https://www.threads.net/@${username}`, {
    headers: { 'sec-fetch-site': 'same-site' }
  })

  const userId = response.data.match(/"user_id":"(\d+)"/)?.[1]

  return userId
}

export const getUserData = async ({ username }: { username?: string }) => {
  if (!username) return null

  const userId = await getUserId({ username })

  if (!userId) return null

  const variables = { userID: userId }
  const documentId = ENDPOINTS_DOCUMENT_ID.USER_PROFILE

  const data: FullUserData = await fetchData({
    variables,
    documentId
  })

  return mapUserData(data)
}
