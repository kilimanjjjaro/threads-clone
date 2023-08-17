import { component$, useContextProvider } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import Header from '~/components/header/header'
import Filters from '~/components/threads/filters'
import Threads from '~/components/threads/threads'
import DownloadThreads from '~/components/download-threads/download-threads'
import Footer from '~/components/footer/footer'
import { getUserData } from '~/lib/services/getUserData'
import { getUserThreads } from '~/lib/services/getUserThreads'
import { UserContext } from '~/lib/context'

export const useUser = routeLoader$(async (requestEvent) => {
  const username = requestEvent.params.username

  const userData = await getUserData({ username: username })
  const userThreads = await getUserThreads({ username: username })

  if (!userData) {
    requestEvent.status(404)
  }

  return {
    userData: userData,
    userThreads: userThreads
  }
})

export default component$(() => {
  const user = useUser()

  if (user.value.userData === null) {
    return (
      <div class='flex justify-center items-center h-screen text-threads-white'>
        User not found
      </div>
    )
  }

  useContextProvider(UserContext, user.value)

  return (
    <div class='max-w-[620px] mx-auto px-6'>
      <Header />
      <main class='flex flex-col gap-4 mb-4'>
        <Filters />
        <Threads />
      </main>
      <DownloadThreads />
      <Footer />
    </div>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const user = resolveValue(useUser)

  const fullName = user.userData?.full_name
  const username = user.userData?.username

  return {
    title: `${fullName} (@${username}) on Threads Clone`
  }
}
