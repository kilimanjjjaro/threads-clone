import { server$ } from '@builder.io/qwik-city'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import { uploadAvatar } from '~/lib/utils/uploadAvatar'
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

    const user = data?.data?.userData?.user

    const avatarUrl = await uploadAvatar(user.hd_profile_pic_versions[0].url)

    if (avatarUrl) user.profile_pic_url = avatarUrl

    return user
  }
)
