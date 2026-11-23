import { component$ } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import LikeIcon from '~/components/icons/like-icon'
import CommentIcon from '~/components/icons/comment-icon'
import RepostIcon from '~/components/icons/repost-icon'
import ShareIcon from '~/components/icons/share-icon'

export default component$(() => {
  const nav = useNavigate()

  return (
    <div class='mt-3 flex gap-4'>
      <button
        onClick$={() => nav('/')}
        class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Like'
      >
        <div class='absolute h-9 w-9 scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
        <LikeIcon classes='z-10 w-5 h-5 text-threads-white' />
      </button>
      <button
        onClick$={() => nav('/')}
        class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Comment'
      >
        <div class='absolute h-9 w-9 scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
        <CommentIcon classes='z-10 w-5 h-5 text-threads-white' />
      </button>
      <button
        onClick$={() => nav('/')}
        class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Repost'
      >
        <div class='absolute h-9 w-9 scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
        <RepostIcon classes='z-10 w-5 h-5 fill-threads-white' />
      </button>
      <button
        onClick$={() => nav('/')}
        class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
        aria-label='Share'
      >
        <div class='absolute h-9 w-9 scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
        <ShareIcon classes='z-10 w-5 h-5 text-threads-white' />
      </button>
    </div>
  )
})
