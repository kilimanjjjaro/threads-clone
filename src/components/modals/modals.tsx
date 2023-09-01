import { $, component$, useContext } from '@builder.io/qwik'
import { ModalContext } from '~/lib/context'
import ReportAProblemModal from './report-a-problem-modal'
import CloseIcon from '../icons/close-icon'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)

  const handleClose = $(() => {
    modalCode.value = MODAL_CODES.HIDDEN
  })

  if (modalCode.value === MODAL_CODES.HIDDEN) return null

  return (
    <div class='fixed inset-0 flex justify-center items-center'>
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
      {modalCode.value === MODAL_CODES.REPORT_PROBLEM && (
        <div role='dialog' class='z-10 px-6 md:px-0 w-full md:w-auto'>
          <ReportAProblemModal />
        </div>
      )}
    </div>
  )
})
