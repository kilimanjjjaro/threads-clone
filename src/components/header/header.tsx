import { $, component$, useSignal, useContext } from '@builder.io/qwik'
import ThreadsSymbolLogo from '~/components/icons/threads-symbol-logo'
import FollowerCount from '~/components/header/follower-count'
import BioLinks from '~/components/header/bio-links'
import Avatar from '~/components/header/avatar'
import MoreIcon from '~/components/icons/more-icon'
import InstagramIcon from '~/components/icons/instagram-icon'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userData: user } = useContext(UserContext)

  const darkMode = useSignal(true)

  const toggleDarkMode = $(() => {
    darkMode.value = !darkMode.value
  })

  return (
    <header class='flex flex-col gap-4 justify-center mb-4'>
      <div class='py-6 self-center'>
        <button
          class='transition-transform duration-200 ease-in-out hover:scale-[1.07]'
          aria-label='Change theme color'
          onClick$={toggleDarkMode}
        >
          <ThreadsSymbolLogo classes='w-6 h-6 text-threads-white' />
        </button>
      </div>
      <div class='flex justify-between items-center gap-2'>
        <div>
          <h2 class='text-2xl text-threads-white font-bold mb-1'>
            {user.full_name}
          </h2>
          <div class='flex gap-2'>
            <span class='text-threads-white'>{user.username}</span>
            <button class='text-xs bg-threads-dark-gray text-threads-light-gray px-2 py-[6px] rounded-[30px] active:scale-90 hover:bg-threads-dark-gray/50 ease-in-out duration-200'>
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
      <p class='text-threads-white whitespace-pre-line break-words'>
        {user.biography}
      </p>
      <div class='flex justify-between items-center'>
        <div class='flex gap-1 items-center text-threads-light-gray'>
          <FollowerCount count={user.follower_count} />
          <BioLinks links={user.bio_links} />
        </div>
        <div class='flex gap-4'>
          <a
            class='relative flex justify-center items-center group transition-transform duration-200 ease-in-out active:scale-90'
            aria-label='Instagram'
            href={`https://instagram.com/${user.username}`}
          >
            <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-[150%] h-[150%] transition-transform duration-200 ease-in-out group-hover:scale-100'></div>
            <InstagramIcon classes='z-10 w-6 h-6 text-threads-white' />
          </a>
          <a
            class='relative flex justify-center items-center group transition-transform duration-200 ease-in-out active:scale-90'
            aria-label='More'
            href=''
          >
            <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-[150%] h-[150%] transition-transform duration-200 ease-in-out group-hover:scale-100'></div>
            <MoreIcon classes='z-10 w-6 h-6 text-threads-white' />
          </a>
        </div>
      </div>
    </header>
  )
})
