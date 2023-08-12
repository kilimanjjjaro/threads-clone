import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { ThreadsLogo } from '~/components/icons/threads-logo'

export default component$(() => {
  return (
    <div class='flex flex-col items-center py-11 px-4 bg-[#0a0a0a] rounded-2xl'>
      <div class='relative w-20 h-20 mb-4'>
        <div class='bg-black p-2 w-14 h-14 rounded-xl'>
          <ThreadsLogo class=' text-threads-white' />
        </div>
        <Image
          class='rounded-full absolute bottom-0 right-0 border-4 border-[#0a0a0a]'
          src='http://localhost:5173/images/avatar.jpg'
          layout='constrained'
          width={58}
          height={58}
          alt={'Foto de perfil de zuck'}
        />
      </div>
      <span class='text-threads-light-gray mb-6'>
        Descarga la app Threads para ver más contenido de zuck.
      </span>
      <a
        class='px-4 pt-1 pb-[6px] rounded-[10px] text-threads-white font-semibold border border-threads-white/[0.15] transition-transform duration-200 active:scale-95'
        href='https://www.threads.net/download/redirect'
        target='_blank'
        rel='noopener noreferrer'
      >
        Descargar Threads
      </a>
    </div>
  )
})
