import { $, component$, useContext } from '@builder.io/qwik'
import { ModalContext } from '~/lib/context'
import { FOOTER_LINKS, MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { openModal } = useContext(ModalContext)

  const openReportProblemModal = $(async () => {
    await openModal(MODAL_CODES.REPORT_PROBLEM)
  })

  return (
    <footer class='flex flex-wrap justify-center gap-3 px-4 py-7 text-xs text-threads-light-gray'>
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
      <button onClick$={openReportProblemModal}>Report a problem</button>
    </footer>
  )
})
