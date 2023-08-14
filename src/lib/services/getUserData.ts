import axios from 'axios'
import {
  ENDPOINTS_DOCUMENT_ID,
  GRAPHQL_ENDPOINT,
  THREADS_APP_ID
} from '../constants'
import type { FullUserData, UserDataInterface } from '~/lib/interfaces/users'
import mapUserData from '~/lib/services/mapUserData'
import { UserThreads } from '~/routes/@[username]'
import mapUserThreads from './mapUserThreads'
import { UserThreadsInterface } from '../interfaces/threads'

const fetchData = async ({
  documentId,
  variables
}: {
  documentId: number
  variables: { userID: string }
}) => {
  const body = `lsd=jdFoLBsUcm9h-j90PeanuC&jazoest=21926&variables=${JSON.stringify(
    variables
  )}&doc_id=${documentId}`

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'user-agent': 'Threads clone by kilimanjjjaro.com',
    'x-ig-app-id': THREADS_APP_ID,
    'x-fb-lsd': 'jdFoLBsUcm9h-j90PeanuC'
  }

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, body, { headers })

    return response.data
  } catch (error) {
    console.error(error)
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

  const data: UserDataInterface = await fetchData({
    variables,
    documentId
  })

  return data?.data?.userData?.user
}

export const getUserThreads = async ({ username }: { username?: string }) => {
  if (!username) return null

  const userId = await getUserId({ username })

  if (!userId) return null

  const variables = { userID: userId }
  const documentId = ENDPOINTS_DOCUMENT_ID.USER_PROFILE_THREADS

  const data: UserThreadsInterface = await fetchData({
    variables,
    documentId
  })

  return data.data.mediaData.threads
}
