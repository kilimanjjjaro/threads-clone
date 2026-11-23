import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

export default component$(() => (
  <div class='flex h-12'>
    <Link
      class='flex w-full items-center justify-center border-b border-threads-white bg-transparent text-threads-white transition-opacity duration-300 ease-in-out active:opacity-60 xl:hover:opacity-60'
      href='#'
    >
      Threads
    </Link>
    <Link
      class='flex w-full cursor-not-allowed items-center justify-center border-b border-threads-white/10 text-threads-light-gray'
      href='#'
    >
      Replies
    </Link>
    <Link
      class='flex w-full cursor-not-allowed items-center justify-center border-b border-threads-white/10 text-threads-light-gray'
      href='#'
    >
      Reposts
    </Link>
  </div>
))
