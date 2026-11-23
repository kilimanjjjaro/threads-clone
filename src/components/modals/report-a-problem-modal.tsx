import { $, component$, useSignal } from '@builder.io/qwik'

const SENDING_MS = 2000
const DEMO_NOTICE_MS = 4000

export default component$(() => {
  const sending = useSignal(false)
  const sended = useSignal(false)

  const handleSubmit = $((_event: SubmitEvent, form: HTMLFormElement) => {
    sending.value = true

    setTimeout(() => {
      sending.value = false
      sended.value = true
    }, SENDING_MS)

    setTimeout(() => {
      sended.value = false
      form.reset()
    }, DEMO_NOTICE_MS)
  })

  return (
    <section class='md:w-96'>
      <h2 class='mb-4 text-center font-bold text-threads-white'>
        Report a problem
      </h2>
      <form
        preventdefault:submit
        onSubmit$={handleSubmit}
        class='flex flex-col items-end overflow-hidden rounded-2xl border border-threads-white/10 bg-threads-dark-gray p-6'
      >
        <textarea
          class={`h-24 w-full resize-none overflow-hidden bg-transparent text-threads-white outline-hidden placeholder:text-threads-light-gray focus:text-threads-white active:text-threads-white`}
          name='report'
          placeholder='Please include as many details as possible...'
          disabled={sending.value || sended.value}
          required
        />
        <button
          type='submit'
          class={`flex h-14 items-center justify-center rounded-full border border-threads-white/10 bg-threads-white/10 px-8 text-threads-light-gray duration-300 ease-in-out active:scale-90 xl:hover:border-threads-white xl:hover:bg-threads-white xl:hover:text-threads-black ${
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
