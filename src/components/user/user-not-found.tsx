import { $, component$ } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import ThreadsTextLogo from '~/components/icons/threads-text-logo'

export default component$(() => {
  const nav = useNavigate()

  const handleClick = $(() => {
    nav('/')
  })

  return (
    <div
      class='relative flex justify-center items-center w-full h-screen bg-cover bg-center'
      style={{ backgroundImage: 'url(/images/home-bg.png)' }}
    >
      <ThreadsTextLogo classes='absolute left-9 top-9 w-[90px] fill-threads-white' />
      <main>
        <section class='rounded-[18px] overflow-hidden bg-[#181818] border border-threads-white/[0.15]'>
          <div class='p-6 flex flex-col gap-6'>
            <h2 class='text-threads-white text-2xl font-bold text-center cursor-pointer'>
              User not found
            </h2>
            <p
              class='text-threads-light-gray text-center'
              style={'text-wrap:balance'}
            >
              Please, be sure that account exists.
            </p>
          </div>
          <button
            class='h-12 flex justify-center items-center border-t w-full text-threads-white border-threads-white/[0.15] active:bg-threads-dark-gray hover:bg-threads-dark-gray transition-colors ease-in-out duration-200'
            onClick$={handleClick}
          >
            Try again
          </button>
        </section>
      </main>
    </div>
  )
})
