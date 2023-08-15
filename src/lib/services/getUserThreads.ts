import { server$ } from '@builder.io/qwik-city'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import type { UserThreadsInterface } from '~/lib/interfaces/threads'
import { ENDPOINTS_DOCUMENT_ID } from '~/lib/constants'

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

    return data.data.mediaData.threads
  }
)
