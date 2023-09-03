import { server$ } from '@builder.io/qwik-city'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import { ENDPOINTS_DOCUMENT_ID } from '~/lib/constants'
import type { UserThreadsInterface } from '~/lib/interfaces/threads'

export const getUserThreads = server$(
  async ({ username }: { username?: string }) => {
    if (!username) return null

    const userId = await getUserId({ username })

    if (!userId) return null

    const variables = { userID: userId }
    const documentId = ENDPOINTS_DOCUMENT_ID.USER_PROFILE_THREADS

    const data: UserThreadsInterface = await fetchData({
      variables,
      documentId
    })

    const threads = data?.data?.mediaData?.threads

    return threads
  }
)
