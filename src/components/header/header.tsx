import { Link, useNavigate } from '@builder.io/qwik-city'
import { $, component$, useContext } from '@builder.io/qwik'
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
  const { modalCode } = useContext(ModalContext)
  const nav = useNavigate()

  const formattedBiography = formatLinks(user.biography)

  const openSoonModal = $(() => (modalCode.value = MODAL_CODES.SOON))
  const openCloneModal = $(() => (modalCode.value = MODAL_CODES.CLONE))

  return (
    <header class='flex flex-col gap-4 justify-center mb-4'>
      <div class='fixed top-0 left-0 flex justify-center w-full py-5 bg-threads-black/50 backdrop-blur-xl z-20'>
        <button
          class='transition-transform duration-300 ease-in-out xl:hover:scale-[1.07]'
          aria-label='Change theme color'
          onClick$={() => nav('/')}
        >
          <ThreadsLogo classes='w-8 h-8 text-threads-white' />
        </button>
        <Link
          class='absolute right-4 px-4 h-[34px] flex items-center bg-threads-white text-threads-black font-semibold rounded-[10px] transition-transform ease-in-out duration-300 active:scale-95'
          href='/'
        >
          Log in
        </Link>
      </div>
      <div class='flex justify-between items-center gap-2 mt-24'>
        <div>
          <h2 class='text-2xl text-threads-white font-bold mb-1'>
            {user.full_name}
          </h2>
          <div class='flex gap-2'>
            <span class='text-threads-white'>{user.username}</span>
            <button
              onClick$={openSoonModal}
              class='text-xs bg-threads-dark-gray text-threads-light-gray px-2 py-[6px] rounded-[30px] active:scale-90 xl:hover:bg-threads-dark-gray/50 ease-in-out duration-300'
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
      {user.biography && (
        <p
          class='text-threads-white whitespace-pre-line break-words blue-links'
          dangerouslySetInnerHTML={formattedBiography}
        />
      )}
      <div class='flex justify-between gap-4 items-center'>
        <div class='flex gap-1 items-center text-threads-light-gray overflow-hidden'>
          <FollowerCount count={user.follower_count} />
          <BioLinks links={user.bio_links} />
        </div>
        <div class='flex gap-4'>
          <a
            class='relative flex justify-center items-center group transition-transform duration-300 ease-in-out active:scale-90'
            aria-label='Instagram'
            href={`https://instagram.com/${user.username}`}
          >
            <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-[150%] h-[150%] transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
            <InstagramIcon classes='z-10 w-6 h-6 text-threads-white' />
          </a>
          <button
            onClick$={openCloneModal}
            class='relative flex justify-center items-center group transition-transform duration-300 ease-in-out active:scale-90'
            aria-label='More'
          >
            <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-[150%] h-[150%] transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
            <MoreIcon classes='z-10 w-6 h-6 text-threads-white' />
          </button>
        </div>
      </div>
    </header>
  )
})
