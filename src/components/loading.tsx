import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'

const SPLASH_DURATION_MS = 1000

export default component$(() => {
  const isLoading = useSignal(true)

  useVisibleTask$((task) => {
    const timeout = setTimeout(() => {
      isLoading.value = false
    }, SPLASH_DURATION_MS)
    task.cleanup(() => {
      clearTimeout(timeout)
    })
  })

  if (!isLoading.value) return null

  return (
    <div class='fixed inset-0 z-50 flex justify-center bg-threads-black'>
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
  )
})
