import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import {
  type DocumentHead,
  routeAction$,
  Form,
  z,
  zod$
} from '@builder.io/qwik-city'
import Modals from '~/components/modals/modals'

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
  const inputRef = useSignal<HTMLInputElement>()

  useVisibleTask$(() => {
    inputRef.value?.focus()
  })

  return (
    <>
      <main class='w-full h-full flex justify-center items-center px-6 xl:px-0 pt-[100px] xl:pt-[72px] bg-no-repeat bg-top bg-[length:140vh] xl:bg-[length:93%] bg-[url(/images/bg-dark.webp)]'>
        <section class='md:w-80'>
          <h2 class='text-threads-white font-bold text-center mb-2'>
            Log in with username
          </h2>
          <p class='text-threads-light-gray text-center mb-4 text-balance'>
            For testing purposes, you can enter the username of a real account
            and visit the profile <b>without logging in</b>.
          </p>
          <Form action={action}>
            <div class='flex rounded-full overflow-hidden border border-threads-white/10 h-14 mb-4'>
              <span class='pl-[18px] pr-4 flex justify-center items-center text-threads-light-gray border-r border-threads-white/10 cursor-not-allowed'>
                @
              </span>
              <input
                ref={inputRef}
                class={`w-full px-6 bg-transparent active:bg-threads-dark-gray focus:bg-threads-dark-gray xl:hover:bg-threads-dark-gray outline-none text-threads-white placeholder:text-threads-light-gray ${
                  action.isRunning && 'disabled:cursor-not-allowed'
                }`}
                type='text'
                name='username'
                placeholder='Username'
                disabled={action.isRunning}
                autoFocus
                required
              />
            </div>
            <button
              type='submit'
              class={`h-14 flex justify-center items-center border w-full rounded-full bg-threads-dark-gray text-threads-light-gray border-threads-white/10 active:scale-90 xl:hover:bg-threads-white xl:hover:text-threads-black xl:hover:border-threads-white ease-in-out duration-300 ${
                action.isRunning && 'animate-pulse'
              }`}
              disabled={action.isRunning}
            >
              {action.isRunning ? 'Logging in...' : 'Log in'}
            </button>
          </Form>
        </section>
      </main>
      <Modals />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Threads Clone'
}
