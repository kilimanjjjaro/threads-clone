import {
  $,
  component$,
  useSignal,
  type QwikSubmitEvent
} from '@builder.io/qwik'
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city'
import ThreadsTextLogo from '~/components/icons/threads-text-logo'
import QrIcon from '~/components/icons/qr-icon'
import AppleLogo from '~/components/icons/apple-logo'
import AndroidLogo from '~/components/icons/android-logo'

export default component$(() => {
  const showKilimanjjjaroVersion = useSignal(true)
  const nav = useNavigate()

  const toggleVersion = $(() => {
    showKilimanjjjaroVersion.value = !showKilimanjjjaroVersion.value
  })

  const handleSubmit = $((event: QwikSubmitEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement
    const username = form.username.value

    if (username === '') return

    nav(`/@${username}`)
  })

  return (
    <div
      class='relative flex justify-center items-center w-full h-screen bg-cover bg-center'
      style={{ backgroundImage: 'url(/images/home-bg.png)' }}
    >
      <ThreadsTextLogo classes='absolute left-9 top-9 w-[90px] fill-threads-white' />
      <div class='absolute top-9 h-10 flex bg-threads-dark-gray border border-threads-white/[0.15] rounded-full overflow-hidden'>
        <button
          class='px-4 active:opacity-60 bg-threads-dark-gray text-threads-light-gray'
          onClick$={toggleVersion}
        >
          Kilimanjjjaro version
        </button>
        <button
          class='px-4 active:opacity-60 bg-[#181818] text-threads-light-gray'
          onClick$={toggleVersion}
        >
          Threads version
        </button>
      </div>
      <main>
        {showKilimanjjjaroVersion.value && (
          <section class='rounded-[18px] max-w-[260px] overflow-hidden bg-[#181818] border border-threads-white/[0.15]'>
            <form preventdefault:submit onSubmit$={handleSubmit}>
              <div class='p-6 flex flex-col gap-6'>
                <label
                  for='username'
                  class='text-threads-white text-2xl font-bold text-center cursor-pointer'
                >
                  Search user
                </label>
                <p
                  class='text-threads-light-gray text-center'
                  style={'text-wrap:balance'}
                >
                  For testing purposes, you can enter the username of an
                  existing account.
                </p>
                <div class='flex rounded-full border border-threads-white/[0.15] h-10 overflow-hidden'>
                  <span class='pl-[14px] pr-3 flex justify-center items-center text-threads-light-gray border-r border-threads-white/[0.15] cursor-not-allowed'>
                    @
                  </span>
                  <input
                    class='w-full px-4 bg-transparent active:bg-threads-dark-gray focus:bg-threads-dark-gray outline-none text-threads-light-gray placeholder:text-threads-light-gray'
                    type='text'
                    name='username'
                    id='username'
                    placeholder='zuck'
                  />
                </div>
              </div>
              <button class='h-12 flex justify-center items-center border-t w-full text-threads-white border-threads-white/[0.15] active:bg-threads-dark-gray'>
                Enter
              </button>
            </form>
          </section>
        )}
        {!showKilimanjjjaroVersion.value && (
          <section>
            <div class='rounded-[18px] overflow-hidden bg-[#181818] border border-threads-white/[0.15]'>
              <div class='p-6'>
                <QrIcon classes='w-[154px]' />
              </div>
              <div class='flex border-t border-threads-white/[0.15]'>
                <a
                  class='w-full flex justify-center items-center py-4 active:bg-threads-dark-gray'
                  href=''
                >
                  <AppleLogo classes='w-5 fill-threads-white' />
                </a>
                <a
                  class='w-full flex justify-center items-center py-4 active:bg-threads-dark-gray'
                  href=''
                >
                  <AndroidLogo classes='w-5 fill-threads-white' />
                </a>
              </div>
            </div>
            <p class='text-threads-white font-bold text-center mt-4'>
              Descargar la app Threads
            </p>
          </section>
        )}
      </main>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Threads Clone'
}
