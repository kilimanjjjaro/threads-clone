import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div class='flex h-12'>
      <Link
        class='w-full flex justify-center items-center border-b border-threads-white bg-transparent text-threads-white active:opacity-60 xl:hover:opacity-60 transition-opacity ease-in-out duration-300'
        href='#'
      >
        Threads
      </Link>
      <Link
        class='w-full flex justify-center items-center border-b border-threads-white/10 text-threads-light-gray cursor-not-allowed'
        href='#'
      >
        Replies
      </Link>
      <Link
        class='w-full flex justify-center items-center border-b border-threads-white/10 text-threads-light-gray cursor-not-allowed'
        href='#'
      >
        Reposts
      </Link>
    </div>
  )
})
