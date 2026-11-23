import { $, component$, useContext } from '@builder.io/qwik'
import QrIcon from '~/components/icons/qr-icon'
import { ModalContext, setModal } from '~/lib/context'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)

  const openGetTheAppModal = $(() => {
    setModal(modalCode, MODAL_CODES.QR)
  })

  return (
    <div
      class='fixed right-5 bottom-5 hidden cursor-pointer rounded-2xl border border-threads-white/10 bg-[#181818] p-3 transition duration-300 ease-in-out xl:block xl:hover:scale-105 xl:hover:border-threads-white/40'
      onClick$={openGetTheAppModal}
    >
      <QrIcon classes='w-24 h-24 2xl:w-32 2xl:h-32' />
    </div>
  )
})
