import { server$ } from '@builder.io/qwik-city'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { ENDPOINTS_DOCUMENT_ID, MEDIA_TYPES } from '~/lib/constants'
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

    const avatarUrl = await uploadMedia({
      mediaUrl: user.hd_profile_pic_versions[0].url,
      type: MEDIA_TYPES.AVATAR
    })

    if (avatarUrl) user.profile_pic_url = avatarUrl.url

    return user
  }
)
