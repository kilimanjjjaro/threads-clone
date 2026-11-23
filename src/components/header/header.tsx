import { Link, useNavigate } from '@builder.io/qwik-city'
import { $, component$, useContext, useSignal } from '@builder.io/qwik'
import FollowerCount from '~/components/header/follower-count'
import BioLinks from '~/components/header/bio-links'
import Avatar from '~/components/header/avatar'
import ThreadsLogo from '~/components/icons/threads-logo'
import MoreIcon from '~/components/icons/more-icon'
import InstagramIcon from '~/components/icons/instagram-icon'
import { ModalContext, UserContext } from '~/lib/context'
import formatLinks from '~/lib/utils/formatLinks'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { userData: user } = useContext(UserContext)
  const { openModal } = useContext(ModalContext)
  const dropdownStatus = useSignal(false)
  const nav = useNavigate()

  const formattedBiography = formatLinks(user.biography)

  const openSoonModal = $(async () => {
    await openModal(MODAL_CODES.SOON)
  })

  return (
    <header class='mb-4 flex flex-col justify-center gap-4'>
      <div class='fixed top-0 left-0 z-20 flex w-full justify-center bg-threads-black/50 py-5 backdrop-blur-xl'>
        <button
          class='transition-transform duration-300 ease-in-out xl:hover:scale-105'
          aria-label='Change theme color'
          onClick$={async () => {
            await nav('/')
          }}
        >
          <ThreadsLogo classes='w-8 h-8 text-threads-white' />
        </button>
        <Link
          class='absolute right-5 flex h-[34px] items-center rounded-[10px] bg-threads-white px-4 font-semibold text-threads-black transition-transform duration-300 ease-in-out active:scale-90 xl:hover:scale-105'
          href='/'
        >
          Log in
        </Link>
      </div>
      <div class='mt-24 flex items-center justify-between gap-2'>
        <div>
          <h2 class='mb-1 text-2xl font-bold text-threads-white'>
            {user.full_name}
          </h2>
          <div class='flex gap-2'>
            <span class='text-threads-white'>{user.username}</span>
            <button
              onClick$={openSoonModal}
              class='rounded-[30px] bg-threads-dark-gray px-2 py-[6px] text-xs text-threads-light-gray duration-300 ease-in-out active:scale-90 xl:hover:bg-threads-dark-gray/50'
            >
              threads.net
            </button>
          </div>
        </div>
        <Avatar
          avatar={user.profile_pic_url}
          username={user.username}
          isVerified={user.is_verified}
        />
      </div>
      {user.biography !== '' && (
        <p
          class='blue-links wrap-break-word whitespace-pre-line text-threads-white'
          dangerouslySetInnerHTML={formattedBiography}
        />
      )}
      <div class='flex items-center justify-between gap-4'>
        <div class='flex items-center gap-1 overflow-hidden text-threads-light-gray'>
          <FollowerCount count={user.follower_count} />
          <BioLinks links={user.bio_links} />
        </div>
        <div class='flex gap-4'>
          <a
            class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
            aria-label='Instagram'
            href={`https://instagram.com/${user.username}`}
          >
            <div class='absolute h-[150%] w-[150%] scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
            <InstagramIcon classes='z-10 w-6 h-6 text-threads-white' />
          </a>
          <button
            onClick$={() => (dropdownStatus.value = !dropdownStatus.value)}
            class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
            aria-label='More'
          >
            <div class='absolute h-[150%] w-[150%] scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
            <MoreIcon classes='z-10 w-6 h-6 text-threads-white' />
            <ul
              class={`absolute top-full right-0 z-10 mt-3 w-full min-w-[140px] origin-top-right rounded-2xl border border-threads-white/10 bg-[#181818] px-4 py-3 transition-transform duration-300 ease-in-out ${
                dropdownStatus.value ? 'scale-100' : 'scale-0'
              }`}
            >
              <li class='text-left'>
                <a
                  class='block text-red-600'
                  href={`https://help.instagram.com/contact/778323897161220?inputPosterUsername=${user.username}`}
                  target='_blank'
                  rel='nofollow noreferrer'
                >
                  Report
                </a>
              </li>
            </ul>
          </button>
        </div>
      </div>
    </header>
  )
})
