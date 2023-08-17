import { $, component$, useContextProvider } from '@builder.io/qwik'
import {
  type DocumentHead,
  routeLoader$,
  useNavigate
} from '@builder.io/qwik-city'
import Header from '~/components/header/header'
import Filters from '~/components/threads/filters'
import Threads from '~/components/threads/threads'
import DownloadThreads from '~/components/download-threads/download-threads'
import Footer from '~/components/footer/footer'
import { getUserData } from '~/lib/services/getUserData'
import { getUserThreads } from '~/lib/services/getUserThreads'
import { UserContext } from '~/lib/context'
import ThreadsTextLogo from '~/components/icons/threads-text-logo'

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
  const nav = useNavigate()

  const handleClick = $(() => {
    nav()
  })

  if (user.value.userData === null) {
    return (
      <div
        class='relative flex justify-center items-center w-full h-screen bg-cover bg-center'
        style={{ backgroundImage: 'url(/images/home-bg.png)' }}
      >
        <ThreadsTextLogo classes='absolute left-9 top-9 w-[90px] fill-threads-white' />
        <main>
          <section class='rounded-[18px] max-w-[260px] overflow-hidden bg-[#181818] border border-threads-white/[0.15]'>
            <div class='p-6 flex flex-col gap-6'>
              <h2 class='text-threads-white text-2xl font-bold text-center cursor-pointer'>
                User not found!
              </h2>
              <p
                class='text-threads-light-gray text-center'
                style={'text-wrap:balance'}
              >
                Please, be sure that account exists.
              </p>
              <button
                class='h-12 flex justify-center items-center border-t w-full text-threads-white border-threads-white/[0.15] active:bg-threads-dark-gray hover:bg-threads-dark-gray transition-colors ease-in-out duration-200'
                onClick$={handleClick}
              >
                Try again
              </button>
            </div>
          </section>
        </main>
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
