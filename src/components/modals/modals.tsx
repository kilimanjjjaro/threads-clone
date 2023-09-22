import { $, component$, useComputed$, useContext } from '@builder.io/qwik'
import { ModalContext } from '~/lib/context'
import ReportAProblemModal from '~/components/modals/report-a-problem-modal'
import AvatarModal from '~/components/modals/avatar-modal'
import SoonModal from '~/components/modals/soon-modal'
import CloneModal from '~/components/modals/clone-modal'
import CloseIcon from '~/components/icons/close-icon'
import QrModal from '~/components/modals/qr-modal'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)

  const modalStatus = useComputed$(() => {
    return modalCode.value !== MODAL_CODES.HIDDEN
  })

  const closeModal = $(() => {
    modalCode.value = MODAL_CODES.HIDDEN
  })

  return (
    <div
      class={`fixed inset-0 justify-center bg-threads-black/[.97] backdrop-blur-xl items-center z-50 ${
        modalStatus.value ? 'animate-fadeIn' : 'animate-fadeOut'
      }`}
    >
      <div
        onClick$={closeModal}
        class='absolute w-full h-full bg-transparent cursor-pointer'
      />
      <button
        onClick$={closeModal}
        class='absolute left-6 top-6 bg-threads-dark-gray w-11 h-11 flex justify-center items-center rounded-full xl:hover:scale-105 transition-transform ease-in-out duration-300 z-10'
      >
        <CloseIcon classes='w-4 h-4 stroke-threads-light-gray' />
      </button>
      <div role='dialog' class='z-10 px-6 md:px-0 w-full md:w-auto'>
        {modalCode.value === MODAL_CODES.REPORT_PROBLEM && (
          <ReportAProblemModal />
        )}
        {modalCode.value === MODAL_CODES.AVATAR && <AvatarModal />}
        {modalCode.value === MODAL_CODES.SOON && <SoonModal />}
        {modalCode.value === MODAL_CODES.CLONE && <CloneModal />}
        {modalCode.value === MODAL_CODES.QR && <QrModal />}
      </div>
    </div>
  )
})
