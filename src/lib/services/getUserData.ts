import { server$ } from '@builder.io/qwik-city'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import { ENDPOINTS_DOCUMENT_ID } from '~/lib/constants'
import type { UserDataInterface } from '~/lib/interfaces/users'

export const getUserData = server$(
  async ({ username }: { username?: string }) => {
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
)
