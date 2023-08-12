import { component$ } from '@builder.io/qwik'
import { FOOTER_LINKS } from '~/constants/general'

export default component$(() => {
  return (
    <footer class='flex text-xs text-threads-light-gray py-7 justify-center gap-3'>
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
    </footer>
  )
})
