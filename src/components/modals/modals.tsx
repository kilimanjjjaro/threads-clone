import { $, component$, useContext } from '@builder.io/qwik'
import { ModalContext } from '~/lib/context'
import ReportAProblemModal from '~/components/modals/report-a-problem-modal'
import AvatarModal from '~/components/modals/avatar-modal'
import SoonModal from '~/components/modals/soon-modal'
import CloneModal from '~/components/modals/clone-modal'
import CloseIcon from '~/components/icons/close-icon'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)

  const handleClose = $(() => {
    modalCode.value = MODAL_CODES.HIDDEN
  })

  if (modalCode.value === MODAL_CODES.HIDDEN) return null

  return (
    <div class='fixed inset-0 flex justify-center items-center z-50'>
      <div
        onClick$={handleClose}
        class='absolute w-full h-full bg-threads-black/[.97] backdrop-blur-xl cursor-pointer'
      />
      <button
        onClick$={handleClose}
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
      </div>
    </div>
  )
})
