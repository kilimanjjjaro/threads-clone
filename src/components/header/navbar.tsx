import { component$ } from '@builder.io/qwik'
import { ThreadsLogo } from '~/components/icons/threads-logo'

export default component$(() => {
  return (
    <header>
      <a href='/' title='Threads'>
        <ThreadsLogo class='w-6 h-6' />
      </a>
    </header>
  )
})
