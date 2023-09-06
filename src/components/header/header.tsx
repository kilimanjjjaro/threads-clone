import { $, component$, useSignal, useContext } from '@builder.io/qwik'
import FollowerCount from '~/components/header/follower-count'
import BioLinks from '~/components/header/bio-links'
import Avatar from '~/components/header/avatar'
import ThreadsLogo from '~/components/icons/threads-logo'
import MoreIcon from '~/components/icons/more-icon'
import InstagramIcon from '~/components/icons/instagram-icon'
import { ModalContext, UserContext } from '~/lib/context'
import { MODAL_CODES } from '~/lib/constants'

export default component$(() => {
  const { userData: user } = useContext(UserContext)
  const { modalCode } = useContext(ModalContext)

  const darkMode = useSignal(true)

  const toggleDarkMode = $(() => {
    darkMode.value = !darkMode.value
  })

  const handleClick = $(() => (modalCode.value = MODAL_CODES.SOON))

  return (
    <header class='flex flex-col gap-4 justify-center mb-4'>
      <div class='py-6 self-center'>
        <button
          class='transition-transform duration-300 ease-in-out xl:hover:scale-[1.07]'
          aria-label='Change theme color'
          onClick$={toggleDarkMode}
        >
          <ThreadsLogo classes='w-6 h-6 text-threads-white' />
        </button>
      </div>
      <div class='flex justify-between items-center gap-2'>
        <div>
          <h2 class='text-2xl text-threads-white font-bold mb-1'>
            {user.full_name}
          </h2>
          <div class='flex gap-2'>
            <span class='text-threads-white'>{user.username}</span>
            <button
              onClick$={handleClick}
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
        <p class='text-threads-white whitespace-pre-line break-words'>
          {user.biography}
        </p>
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
          <a
            class='relative flex justify-center items-center group transition-transform duration-300 ease-in-out active:scale-90'
            aria-label='More'
            href=''
          >
            <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-[150%] h-[150%] transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
            <MoreIcon classes='z-10 w-6 h-6 text-threads-white' />
          </a>
        </div>
      </div>
    </header>
  )
})
