import { $, component$, useContext } from '@builder.io/qwik'
import { ModalContext } from '~/lib/context'
import { FOOTER_LINKS, MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)

  const handleClick = $(() => (modalCode.value = MODAL_CODES.REPORT_PROBLEM))

  return (
    <footer class='flex flex-wrap px-4 text-xs text-threads-light-gray py-7 justify-center gap-3'>
      © 2023
      {FOOTER_LINKS.map((link) => (
        <a
          key={link.name}
          class='xl:hover:underline'
          href={link.href}
          rel='nofollow noreferrer'
          target='_blank'
        >
          {link.name}
        </a>
      ))}
      <button onClick$={handleClick}>Report a problem</button>
    </footer>
  )
})
