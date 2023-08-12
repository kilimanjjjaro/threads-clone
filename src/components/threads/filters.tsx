import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <div class='flex h-12'>
      <a
        class='w-full flex justify-center items-center border-b border-threads-white bg-transparent text-threads-white active:opacity-60'
        href=''
      >
        Hilos
      </a>
      <a
        class='w-full flex justify-center items-center border-b border-threads-white/[0.15] text-threads-light-gray active:opacity-60'
        href=''
      >
        Respuestas
      </a>
    </div>
  )
})
