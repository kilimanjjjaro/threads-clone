import { component$, useContextProvider } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import Header from '~/components/header/header'
import Filters from '~/components/threads/filters'
import Threads from '~/components/threads/threads'
import DownloadThreads from '~/components/download-threads/download-threads'
import UserNotFound from '~/components/user/user-not-found'
import { getUserData } from '~/lib/services/getUserData'
import { getUserThreads } from '~/lib/services/getUserThreads'
import { uploadAvatar } from '~/lib/utils/uploadAvatar'
import { UserContext } from '~/lib/context'
import Modals from '~/components/modals/modals'

export const useUser = routeLoader$(async (requestEvent) => {
  const username = requestEvent.params.username

  const userData = await getUserData({ username: username })

  const userThreads = await getUserThreads({ username: username })
  if (userData === null) {
    requestEvent.status(404)

    return {
      userData: null,
      userThreads: null
    }
  }

  const avatarUrl = await uploadAvatar(userData.hd_profile_pic_versions[0].url)

  if (avatarUrl) userData.profile_pic_url = avatarUrl

  return {
    userData: userData,
    userThreads: userThreads
  }
})

export default component$(() => {
  const user = useUser()

  if (user.value.userData === null || user.value.userThreads === null) {
    return <UserNotFound />
  }

  useContextProvider(UserContext, user.value)

  return (
    <>
      <div class='max-w-[620px] mx-auto px-6'>
        <Header />
        <main class='flex flex-col gap-4 mb-4'>
          <Filters />
          <Threads threads={user.value.userThreads} />
        </main>
        <DownloadThreads />
      </div>
      <Modals />
    </>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const user = resolveValue(useUser)

  if (!user.userData) {
    return {
      title: 'User not found - Threads Clone'
    }
  }

  const fullName = user.userData.full_name
  const username = user.userData.username

  return {
    title: `${fullName} (@${username}) on Threads Clone`
  }
}
