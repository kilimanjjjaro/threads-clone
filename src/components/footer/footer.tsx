import { $, component$, useComputed$, useContext } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import { ModalContext } from '~/lib/context'
import { FOOTER_LINKS, MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)
  const location = useLocation()

  const handleClick = $(() => (modalCode.value = MODAL_CODES.REPORT_PROBLEM))

  const shouldBeFixed = useComputed$(() => {
    return location.url.pathname ? location.url.pathname !== '/' : false
  })

  return (
    <footer
      class={`flex flex-wrap px-4 text-xs text-threads-light-gray py-7 justify-center gap-3
        ${shouldBeFixed.value && 'fixed left-0 right-0 bottom-0'}
      `}
    >
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
      <button onClick$={handleClick}>Report a problem</button>
    </footer>
  )
})
