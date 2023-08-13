import {
  component$,
  createContextId,
  useContextProvider
} from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import Header from '~/components/header/header'
import Filters from '~/components/threads/filters'
import Threads from '~/components/threads/threads'
import DownloadThreads from '~/components/download-threads/download-threads'
import Footer from '~/components/footer/footer'
import { getUserData } from '~/lib/services'
import type { MapedUserData } from '~/lib/types'

export const UserContext = createContextId<MapedUserData>('user')

export const useUser = routeLoader$(async (requestEvent) => {
  const username = requestEvent.params.username

  return await getUserData({ username: username })
})

export default component$(() => {
  const user = useUser()

  if (user.value === null) {
    return (
      <div class='flex justify-center items-center h-screen text-threads-white'>
        User not found
      </div>
    )
  }

  useContextProvider(UserContext, user.value)

  return (
    <>
      <Header />
      <main class='flex flex-col gap-4 mb-4'>
        <Filters />
        <Threads />
      </main>
      <DownloadThreads />
      <Footer />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Threads Clone'
}
