import { component$, useSignal, $ } from '@builder.io/qwik'
import { ThreadsLogo } from '~/components/icons/threads-logo'

export default component$(() => {
  const darkMode = useSignal(true)

  const toggleDarkMode = $(() => {
    darkMode.value = !darkMode.value
  })

  return (
    <header class='flex justify-center py-6'>
      <button aria-label='Change theme color' onClick$={toggleDarkMode}>
        <ThreadsLogo class='w-6 h-6 text-threads-white' />
      </button>
    </header>
  )
})
