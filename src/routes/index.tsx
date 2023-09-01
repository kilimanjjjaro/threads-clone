import { component$ } from '@builder.io/qwik'
import {
  type DocumentHead,
  routeAction$,
  Form,
  z,
  zod$
} from '@builder.io/qwik-city'
import QrIcon from '~/components/icons/qr-icon'

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
  const action = useRedirect()

  return (
    <main
      class='w-full flex min-h-screen justify-center items-center bg-top bg-no-repeat'
      style={{
        backgroundImage: 'url(/images/bg-dark.webp)',
        backgroundSize: '93%'
      }}
    >
      <section class='w-80'>
        <h2 class='text-threads-white font-bold text-center mb-2'>
          Log in with username
        </h2>
        <p
          class='text-threads-light-gray text-center mb-4'
          style={{ 'text-wrap': 'balance' }}
        >
          For testing purposes, you can enter the username of a real account and
          view the profile <u>without logging in</u>.
        </p>
        <Form action={action} class='mb-8'>
          <div class='flex rounded-full overflow-hidden border border-threads-white/[0.15] h-14 mb-4'>
            <span class='pl-[18px] pr-4 flex justify-center items-center text-threads-light-gray border-r border-threads-white/[0.15] cursor-not-allowed'>
              @
            </span>
            <input
              class={`w-full px-6 bg-transparent active:bg-threads-dark-gray focus:bg-threads-dark-gray outline-none text-threads-white placeholder:text-threads-light-gray ${
                action.isRunning && 'disabled:cursor-not-allowed'
              }`}
              type='text'
              name='username'
              id='username'
              placeholder='zuck'
              disabled={action.isRunning}
              autoFocus
              required
            />
          </div>
          <button
            class={`h-14 flex justify-center items-center border w-full rounded-full bg-threads-dark-gray text-threads-light-gray border-threads-white/[0.15] active:scale-95 hover:bg-threads-white hover:text-threads-black hover:border-threads-white ease-in-out duration-200 ${
              action.isRunning && 'animate-pulse'
            }`}
            disabled={action.isRunning}
          >
            {action.isRunning ? 'Logging in...' : 'Log in'}
          </button>
        </Form>
        <span class='flex items-center justify-center gap-4 text-threads-white'>
          Scan to get the app
          <QrIcon classes='w-16 p-1 bg-threads-dark-gray/40 rounded-md' />
        </span>
      </section>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'Threads Clone'
}
