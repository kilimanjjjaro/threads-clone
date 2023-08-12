import { component$, useSignal, $ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { ThreadsLogo } from '~/components/icons/threads-logo'
import { MoreIcon } from '~/components/icons/more-icon'
import { InstagramIcon } from '~/components/icons/instagram-icon'
import { VerifyIcon } from '../icons/verify-icon'

export default component$(() => {
  const darkMode = useSignal(true)

  const toggleDarkMode = $(() => {
    darkMode.value = !darkMode.value
  })

  return (
    <header class='flex flex-col justify-center'>
      <div class='py-6 self-center'>
        <button
          class='transition-transform duration-200 hover:scale-[1.07]'
          aria-label='Change theme color'
          onClick$={toggleDarkMode}
        >
          <ThreadsLogo class='w-6 h-6 text-threads-white' />
        </button>
      </div>
      <div class='flex justify-between items-center gap-2 py-4'>
        <div>
          <h2 class='text-2xl text-threads-white font-bold'>Mark Zuckerberg</h2>
          <div class='flex gap-2'>
            <span class='text-threads-white text-base'>zuck</span>
            <button class='text-xs bg-threads-dark-gray text-threads-light-gray px-2 py-[6px] rounded-[30px]'>
              threads.net
            </button>
          </div>
        </div>
        <div class='relative'>
          <Image
            class='rounded-full'
            src='http://localhost:5173/images/avatar.jpg'
            layout='constrained'
            width={84}
            height={84}
            alt={'Foto de perfil de zuck'}
          />
          <VerifyIcon class='w-6 h-6 absolute left-0 bottom-0' />
        </div>
      </div>
      <div class='flex justify-between items-center'>
        <div class='text-threads-light-gray'>
          <span title='3.260.299'>3,3 mill.</span>
          seguidores
        </div>
        <div class='flex gap-4'>
          <a aria-label='Instagram' href=''>
            <InstagramIcon class='w-6 h-6 text-threads-white' />
          </a>
          <a aria-label='Más' href=''>
            <MoreIcon class='w-6 h-6 text-threads-white' />
          </a>
        </div>
      </div>
    </header>
  )
})
