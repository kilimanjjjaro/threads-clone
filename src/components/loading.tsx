import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'

export default component$(() => {
  const isLoading = useSignal(true)

  useVisibleTask$(async ({ cleanup }) => {
    const timeout = setTimeout(() => (isLoading.value = false), 1000)
    cleanup(() => clearTimeout(timeout))
  })

  if (!isLoading.value) return null

  return (
    <div class='fixed inset-0 bg-threads-black flex justify-center z-50'>
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
