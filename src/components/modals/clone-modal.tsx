import { component$ } from '@builder.io/qwik'
import ThreadsLogo from '~/components/icons/threads-logo'

export default component$(() => {
  return (
    <section class='md:w-[400px]'>
      <div class='flex flex-col gap-4 overflow-hidden rounded-2xl border border-threads-white/10 bg-threads-black p-6'>
        <div class='flex items-center justify-between'>
          <h2 class='text-2xl font-bold text-threads-white'>Ups!</h2>
          <div class='flex h-16 w-16 items-center justify-center rounded-full bg-black'>
            <ThreadsLogo classes='w-8 h-8 text-threads-white' />
          </div>
        </div>
        <p class='text-threads-light-gray'>
          This project is a clone of the new social network by Meta called
          Threads. Some functionalities were not developed.
        </p>
      </div>
    </section>
  )
})
