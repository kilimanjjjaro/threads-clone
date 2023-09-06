import { $, component$ } from '@builder.io/qwik'
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city'
import Modals from '~/components/modals/modals'

export default component$(() => {
  const nav = useNavigate()

  const handleClick = $(() => {
    nav('/')
  })

  return (
    <>
      <main class='flex w-full h-full justify-center items-center px-6 xl:px-0 pt-[100px] xl:pt-[72px] bg-no-repeat bg-top bg-[length:140vh] xl:bg-[length:93%] bg-[url(/images/bg-dark.webp)]'>
        <section class='md:w-80 flex flex-col items-center'>
          <h2 class='text-threads-white font-bold text-center mb-2'>
            Page not found
          </h2>
          <p class='text-threads-light-gray text-center mb-4 text-balance'>
            Please check the URL in the address bar and try again.
          </p>

          <button
            type='submit'
            class='h-14 px-8 flex justify-center items-center border rounded-full bg-threads-dark-gray text-threads-light-gray border-threads-white/[0.15] active:scale-95 xl:hover:bg-threads-white xl:hover:text-threads-black xl:hover:border-threads-white ease-in-out duration-300'
            onClick$={handleClick}
          >
            Try again
          </button>
        </section>
      </main>
      <Modals />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Not found - Threads Clone'
}
