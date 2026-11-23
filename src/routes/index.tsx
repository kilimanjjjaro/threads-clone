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
      <main class='flex h-full w-full items-center justify-center bg-[url(/images/bg-dark.webp)] bg-[length:140vh] bg-top bg-no-repeat px-6 pt-[100px] xl:bg-[length:93%] xl:px-0 xl:pt-[72px]'>
        <section class='md:w-80'>
          <h2 class='mb-2 text-center font-bold text-threads-white'>
            Log in with username
          </h2>
          <p class='mb-4 text-balance text-center text-threads-light-gray'>
            For testing purposes, you can enter the username of a real account
            and visit the profile <b>without logging in</b>.
          </p>
          <Form action={action}>
            <div class='mb-4 flex h-14 overflow-hidden rounded-full border border-threads-white/10'>
              <span class='flex cursor-not-allowed items-center justify-center border-r border-threads-white/10 pl-[18px] pr-4 text-threads-light-gray'>
                @
              </span>
              <input
                ref={inputRef}
                class={`w-full bg-transparent px-6 text-threads-white outline-none placeholder:text-threads-light-gray focus:bg-threads-dark-gray active:bg-threads-dark-gray xl:hover:bg-threads-dark-gray ${
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
              class={`flex h-14 w-full items-center justify-center rounded-full border border-threads-white/10 bg-threads-dark-gray text-threads-light-gray duration-300 ease-in-out active:scale-90 xl:hover:border-threads-white xl:hover:bg-threads-white xl:hover:text-threads-black ${
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
