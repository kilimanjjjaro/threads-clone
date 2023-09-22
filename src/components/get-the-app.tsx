import { $, component$, useContext } from '@builder.io/qwik'
import QrIcon from '~/components/icons/qr-icon'
import { ModalContext } from '~/lib/context'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)

  const openGetTheAppModal = $(() => (modalCode.value = MODAL_CODES.QR))

  return (
    <div
      class='fixed right-5 bottom-5 p-3 bg-[#181818] rounded-2xl border border-threads-white/20 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hidden xl:block'
      onClick$={openGetTheAppModal}
    >
      <QrIcon classes='w-28 h-28 2xl:w-36 2xl:h-36' />
    </div>
  )
})
