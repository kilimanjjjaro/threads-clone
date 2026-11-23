import { $, component$ } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import Modals from '~/components/modals/modals'

export default component$(() => {
  const nav = useNavigate()

  const handleClick = $(async () => {
    await nav('/')
  })

  return (
    <>
      <main class='flex h-full w-full items-center justify-center bg-[url(/images/bg-dark.webp)] bg-[length:140vh] bg-top bg-no-repeat px-6 pt-[100px] xl:bg-[length:93%] xl:px-0 xl:pt-[72px]'>
        <section class='flex flex-col items-center md:w-80'>
          <h2 class='mb-2 text-center font-bold text-threads-white'>
            User not found
          </h2>
          <p class='mb-4 text-balance text-center text-threads-light-gray'>
            Please make sure that the username you entered is from a real
            account.
          </p>

          <button
            type='submit'
            class='flex h-14 items-center justify-center rounded-full border border-threads-white/10 bg-threads-dark-gray px-8 text-threads-light-gray duration-300 ease-in-out active:scale-90 xl:hover:border-threads-white xl:hover:bg-threads-white xl:hover:text-threads-black'
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
