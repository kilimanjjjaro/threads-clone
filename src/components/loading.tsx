import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'

export default component$(() => (
  <div class='fixed inset-0 z-50 flex animate-splash justify-center bg-threads-black'>
    <Image
      class='self-center'
      src='/images/threads-logo.webp'
      alt='Threads logo'
      width={90}
      height={90}
    />
    <Image
      class='absolute bottom-7'
      src='/images/from-meta.webp'
      alt='From Meta'
      width={80}
      height={40}
    />
  </div>
))
