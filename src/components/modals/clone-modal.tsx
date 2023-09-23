import { component$ } from '@builder.io/qwik'
import ThreadsLogo from '~/components/icons/threads-logo'

export default component$(() => {
  return (
    <section class='md:w-[400px]'>
      <div class='bg-threads-black border flex flex-col gap-4 p-6 border-threads-white/10 rounded-2xl overflow-hidden'>
        <div class='flex justify-between items-center'>
          <h2 class='text-2xl text-threads-white font-bold'>Ups!</h2>
          <div class='w-16 h-16 bg-black rounded-full flex justify-center items-center'>
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
