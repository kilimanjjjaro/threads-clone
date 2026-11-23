import { component$, useContextProvider } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import Header from '~/components/header/header'
import Filters from '~/components/threads/filters'
import Threads from '~/components/threads/threads'
import DownloadThreads from '~/components/download-threads'
import UserNotFound from '~/components/user-not-found'
import Modals from '~/components/modals/modals'
import { getUser } from '~/lib/services/getUser'
import { getThreads } from '~/lib/services/getThreads'
import { UserContext } from '~/lib/context'

const NOT_FOUND = 404

export const useUser = routeLoader$(async (requestEvent) => {
  const {
    params: { username }
  } = requestEvent

  const userData = await getUser({ username })

  const userThreads = await getThreads({ username })

  if (userData === null || userThreads === null) {
    requestEvent.status(NOT_FOUND)
  }

  return {
    userData,
    userThreads
  }
})

export default component$(() => {
  const user = useUser()

  if (user.value.userData === null) {
    return <UserNotFound />
  }

  useContextProvider(UserContext, user.value)

  return (
    <>
      <div class='mx-auto w-full max-w-[620px] px-6'>
        <Header />
        <main class='mb-6 flex flex-col gap-4'>
          <Filters />
          <Threads />
        </main>
        <DownloadThreads />
      </div>

      <Modals />
    </>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const { userData } = resolveValue(useUser)

  if (userData === null) {
    return {
      title: 'User not found - Threads Clone'
    }
  }

  const { full_name: fullName, username } = userData

  return {
    title: `${fullName} (@${username}) on Threads Clone`
  }
}
