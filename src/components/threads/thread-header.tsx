import { component$, useSignal } from '@builder.io/qwik'
import dayjs from 'dayjs'
import VerifyIcon from '~/components/icons/verify-icon'
import formatDate from '~/lib/utils/formatDate'
import type { ThreadItem } from '~/lib/interfaces/threads'

interface Props {
  post: ThreadItem['post']
}

export default component$(({ post }: Props) => {
  const isDropdownOpen = useSignal(false)

  return (
    <header class='mt-[-5px] mb-1 flex items-center justify-between'>
      <div class='flex items-center gap-1'>
        <span class='font-semibold text-threads-white'>
          {post.user.username}
        </span>
        {post.user.is_verified && (
          <VerifyIcon classes='w-[16px] h-[16px] pt-[2px]' />
        )}
      </div>
      <div class='flex items-center gap-3'>
        <span
          class='text-threads-light-gray'
          title={dayjs.unix(post.taken_at).format('MMM DD, YYYY, h:mm A')}
        >
          {formatDate(post.taken_at)}
        </span>
        <div class='relative'>
          <button
            class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
            aria-label='More'
            onClick$={() => {
              isDropdownOpen.value = !isDropdownOpen.value
            }}
          >
            <div class='absolute h-[150%] w-[150%] scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
            <svg class='z-10 w-5 fill-threads-white' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='1.5' />
              <circle cx='6' cy='12' r='1.5' />
              <circle cx='18' cy='12' r='1.5' />
            </svg>
          </button>
          <ul
            class={`absolute top-full right-0 z-10 mt-2 w-full min-w-[140px] origin-top-right rounded-2xl border border-threads-white/10 bg-[#181818] px-4 py-3 transition-transform duration-300 ease-in-out ${
              isDropdownOpen.value ? 'scale-100' : 'scale-0'
            }`}
          >
            <li>
              <a
                class='block text-red-600'
                href={`https://help.instagram.com/contact/778323897161220?inputPosterUsername=${post.user.username}&content_id=${post.pk}`}
                target='_blank'
                rel='nofollow noreferrer'
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
})
