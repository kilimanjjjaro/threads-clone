import { server$ } from '@builder.io/qwik-city'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { ENDPOINTS_DOCUMENT_ID, MEDIA_TYPES } from '~/lib/constants'
import type { UserDataInterface } from '~/lib/interfaces/users'

const LARGEST_AVATAR = -1

export const getUser = server$(async ({ username }: { username?: string }) => {
  if (username === undefined || username === '') return null

  const userId = await getUserId({ username })

  if (userId === undefined) return null

  const data = await fetchData<UserDataInterface>({
    userId,
    documentId: ENDPOINTS_DOCUMENT_ID.USER_PROFILE
  })

  // fetchData resolves to undefined when the request fails, and an error
  // response has no data.
  const user = data?.data?.user

  if (user === undefined) return null

  const avatar = user.hd_profile_pic_versions.at(LARGEST_AVATAR)

  if (avatar !== undefined) {
    const uploadedAvatar = await uploadMedia({
      mediaUrl: avatar.url,
      type: MEDIA_TYPES.AVATAR
    })

    if (uploadedAvatar !== undefined) {
      const { url } = uploadedAvatar
      user.profile_pic_url = url
    }
  }

  return user
})
