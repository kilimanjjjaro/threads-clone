import { component$, useSignal } from '@builder.io/qwik'
import {
  type DocumentHead,
  routeAction$,
  Form,
  z,
  zod$
} from '@builder.io/qwik-city'
import ThreadsTextLogo from '~/components/icons/threads-text-logo'
import QrIcon from '~/components/icons/qr-icon'
import AppleLogo from '~/components/icons/apple-logo'
import AndroidLogo from '~/components/icons/android-logo'

export const useRedirect = routeAction$(
  async (data, requestEvent) => {
    const { username } = data

    requestEvent.redirect(301, `/@${username}`)
  },
  zod$({
    username: z.string().nonempty()
  })
)

export default component$(() => {
  const showKilimanjjjaroVersion = useSignal(true)
  const action = useRedirect()

  return (
    <div class='relative flex justify-center items-center w-full h-screen'>
      <ThreadsTextLogo classes='absolute left-9 top-9 w-[90px] fill-threads-white' />
      <div class='absolute top-9 h-10 flex bg-threads-dark-gray border border-threads-white/[0.15] rounded-full overflow-hidden'>
        <button
          class={`px-4 text-threads-light-gray ease-in-out duration-200 hover:opacity-60 ${
            showKilimanjjjaroVersion.value
              ? 'bg-threads-dark-gray'
              : 'bg-[#181818]'
          }`}
          onClick$={() => (showKilimanjjjaroVersion.value = true)}
        >
          Kilimanjjjaro version
        </button>
        <button
          class={`px-4 text-threads-light-gray ease-in-out duration-200 hover:opacity-60 ${
            showKilimanjjjaroVersion.value
              ? 'bg-[#181818]'
              : 'bg-threads-dark-gray'
          }`}
          onClick$={() => (showKilimanjjjaroVersion.value = false)}
        >
          Threads version
        </button>
      </div>
      <main>
        {showKilimanjjjaroVersion.value && (
          <section class='rounded-[18px] max-w-[260px] overflow-hidden bg-[#181818] border border-threads-white/[0.15]'>
            <Form action={action}>
              <div class='p-6 flex flex-col gap-6'>
                <label
                  for='username'
                  class='text-threads-white text-2xl font-bold text-center cursor-pointer'
                >
                  Welcome!
                </label>
                <p
                  class='text-threads-light-gray text-center'
                  style={'text-wrap:balance'}
                >
                  For testing purposes, you can access a user's profile using
                  their username.
                </p>
                <div class='flex rounded-full border border-threads-white/[0.15] h-10 overflow-hidden'>
                  <span class='pl-[14px] pr-3 flex justify-center items-center text-threads-light-gray border-r border-threads-white/[0.15] cursor-not-allowed'>
                    @
                  </span>
                  <input
                    class={`w-full px-4 bg-transparent active:bg-threads-dark-gray focus:bg-threads-dark-gray outline-none text-threads-white placeholder:text-threads-light-gray ${
                      action.isRunning && 'disabled:cursor-not-allowed'
                    }`}
                    type='text'
                    name='username'
                    id='username'
                    placeholder='zuck'
                    disabled={action.isRunning}
                  />
                </div>
              </div>
              <button
                class={`h-12 flex justify-center items-center border-t w-full text-threads-white border-threads-white/[0.15] active:bg-threads-dark-gray hover:bg-threads-dark-gray transition-colors ease-in-out duration-200 ${
                  action.isRunning && 'animate-pulse'
                }`}
                disabled={action.isRunning}
              >
                {action.isRunning ? 'Searching...' : 'Search'}
              </button>
            </Form>
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
                  class='w-full flex justify-center items-center py-4 active:bg-threads-dark-gray hover:bg-threads-dark-gray transition-colors ease-in-out duration-200'
                  href='https://apps.apple.com/us/app/threads-an-instagram-app/id6446901002'
                  aria-label='Get it on App Store'
                >
                  <AppleLogo classes='w-5 fill-threads-white' />
                </a>
                <a
                  class='w-full flex justify-center items-center py-4 active:bg-threads-dark-gray hover:bg-threads-dark-gray transition-colors ease-in-out duration-200'
                  href='https://play.google.com/store/apps/details?id=com.instagram.barcelona&pli=1'
                  aria-label='Get it on Google Play'
                >
                  <AndroidLogo classes='w-5 fill-threads-white' />
                </a>
              </div>
            </div>
            <p class='text-threads-white font-bold text-center mt-4'>
              Get the Threads app
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
