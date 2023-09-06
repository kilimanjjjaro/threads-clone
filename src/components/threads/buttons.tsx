import { $, component$, useContext } from '@builder.io/qwik'
import LikeIcon from '~/components/icons/like-icon'
import CommentIcon from '~/components/icons/comment-icon'
import RepostIcon from '~/components/icons/repost-icon'
import ShareIcon from '~/components/icons/share-icon'
import { ModalContext } from '~/lib/context'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { modalCode } = useContext(ModalContext)

  const openModal = $(() => (modalCode.value = MODAL_CODES.CLONE))

  return (
    <div class='flex gap-4 mt-3'>
      <button
        onClick$={openModal}
        class='relative flex justify-center items-center group transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Like'
      >
        <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-9 h-9 transition-transform duration-300 ease-in-out group-hover:scale-100' />
        <LikeIcon classes='z-10 w-5 h-5 text-threads-white' />
      </button>
      <button
        onClick$={openModal}
        class='relative flex justify-center items-center group transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Comment'
      >
        <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-9 h-9 transition-transform duration-300 ease-in-out group-hover:scale-100' />
        <CommentIcon classes='z-10 w-5 h-5 text-threads-white' />
      </button>
      <button
        onClick$={openModal}
        class='relative flex justify-center items-center group transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Repost'
      >
        <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-9 h-9 transition-transform duration-300 ease-in-out group-hover:scale-100' />
        <RepostIcon classes='z-10 w-5 h-5 fill-threads-white' />
      </button>
      <button
        class='relative flex justify-center items-center group transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Share'
      >
        <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-9 h-9 transition-transform duration-300 ease-in-out group-hover:scale-100' />
        <ShareIcon classes='z-10 w-5 h-5 text-threads-white' />
      </button>
    </div>
  )
})
