import { server$ } from '@builder.io/qwik-city'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import { ENDPOINTS_DOCUMENT_ID } from '~/lib/constants'
import type { UserThreadsInterface } from '~/lib/interfaces/threads'

const FIRST_THREAD = 0
const MAX_PROFILE_THREADS = 5

export const getThreads = server$(
  async ({ username }: { username?: string }) => {
    if (username === undefined || username === '') return null

    const userId = await getUserId({ username })

    if (userId === undefined) return null

    const data = await fetchData<UserThreadsInterface>({
      userId,
      documentId: ENDPOINTS_DOCUMENT_ID.USER_PROFILE_THREADS
    })

    return data?.data?.mediaData.threads.slice(
      FIRST_THREAD,
      MAX_PROFILE_THREADS
    )
  }
)
