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

  if (!modalStatus.value) return null

  return (
    <div class='fixed inset-0 z-50 flex items-center justify-center bg-threads-black/[.97] backdrop-blur-xl'>
      <div
        onClick$={closeModal}
        class='absolute h-full w-full cursor-pointer bg-transparent'
      />
      <button
        onClick$={closeModal}
        class='absolute left-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:hover:scale-105'
      >
        <CloseIcon classes='w-4 h-4 stroke-threads-light-gray' />
      </button>
      <div role='dialog' class='z-10 w-full px-6 md:w-auto md:px-0'>
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
