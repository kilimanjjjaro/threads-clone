import { $, component$, useSignal } from '@builder.io/qwik'
import type { QwikSubmitEvent } from '@builder.io/qwik'

export default component$(() => {
  const sending = useSignal(false)
  const sended = useSignal(false)

  const handleSubmit = $((event: QwikSubmitEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement

    sending.value = true

    setTimeout(() => {
      sending.value = false
      sended.value = true
    }, 2000)

    setTimeout(() => {
      sended.value = false
      form.reset()
    }, 4000)
  })

  return (
    <section class='md:w-96'>
      <h2 class='text-threads-white font-bold text-center mb-4'>
        Report a problem
      </h2>
      <form
        preventdefault:submit
        onSubmit$={handleSubmit}
        class='bg-threads-dark-gray border flex flex-col items-end p-6 border-threads-white/10 rounded-2xl overflow-hidden'
      >
        <textarea
          class={`w-full bg-transparent overflow-hidden active:text-threads-white focus:text-threads-white outline-none h-24 text-threads-white placeholder:text-threads-light-gray resize-none`}
          name='report'
          placeholder='Please include as many details as possible...'
          disabled={sending.value || sended.value}
          required
        />
        <button
          type='submit'
          class={`h-14 px-8 flex justify-center items-center border rounded-full bg-threads-white/10 text-threads-light-gray border-threads-white/10 active:scale-90 xl:hover:bg-threads-white xl:hover:text-threads-black xl:hover:border-threads-white ease-in-out duration-300  ${
            sending.value && 'animate-pulse'
          }`}
          disabled={sending.value || sended.value}
        >
          {sending.value
            ? 'Sending...'
            : sended.value
            ? 'This is a demo!'
            : 'Send'}
        </button>
      </form>
    </section>
  )
})
