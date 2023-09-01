import { component$ } from '@builder.io/qwik'
import { FOOTER_LINKS } from '~/lib/constants'

export default component$(() => {
  return (
    <footer class='flex fixed flex-wrap px-4 left-0 right-0 bottom-0 text-xs text-threads-light-gray py-7 justify-center gap-3'>
      © 2023
      {FOOTER_LINKS.map((link) => (
        <a
          key={link.name}
          class='hover:underline'
          href={link.href}
          rel='nofollow noreferrer'
          target='_blank'
        >
          {link.name}
        </a>
      ))}
      <button>Report a problem</button>
    </footer>
  )
})
