import { component$, useSignal, $, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { ThreadsLogo } from '~/components/icons/threads-logo'
import { MoreIcon } from '~/components/icons/more-icon'
import { InstagramIcon } from '~/components/icons/instagram-icon'
import { VerifyIcon } from '../icons/verify-icon'
import { UserContext } from '~/routes/@[username]'

export default component$(() => {
  const darkMode = useSignal(true)
  const user = useContext(UserContext)

  const toggleDarkMode = $(() => {
    darkMode.value = !darkMode.value
  })

  return (
    <header class='flex flex-col gap-4 justify-center mb-4'>
      <div class='py-6 self-center'>
        <button
          class='transition-transform duration-200 hover:scale-[1.07]'
          aria-label='Change theme color'
          onClick$={toggleDarkMode}
        >
          <ThreadsLogo class='w-6 h-6 text-threads-white' />
        </button>
      </div>
      <div class='flex justify-between items-center gap-2'>
        <div>
          <h2 class='text-2xl text-threads-white font-bold'>{user.fullName}</h2>
          <div class='flex gap-2'>
            <span class='text-threads-white'>{user.username}</span>
            <button class='text-xs bg-threads-dark-gray text-threads-light-gray px-2 py-[6px] rounded-[30px]'>
              threads.net
            </button>
          </div>
        </div>
        <div class='relative'>
          <button onClick$={() => console.log('clicked')}>
            <Image
              class='rounded-full'
              src={user.profilePicture}
              layout='constrained'
              width={84}
              height={84}
              alt={`Foto de perfil de ${user.fullName}`}
              cdn='cloudinary'
            />
          </button>
          {user.isVerified && (
            <VerifyIcon class='w-6 h-6 absolute left-[1.5px] bottom-[1.5px]' />
          )}
        </div>
      </div>
      <p class='text-threads-white whitespace-pre-line break-words'>
        {user.biography}
      </p>
      <div class='flex justify-between items-center'>
        <div class='flex gap-1 items-center text-threads-light-gray'>
          <button
            class='hover:underline'
            onClick$={() => console.log('clicked')}
          >
            <span title={user.followerCount.count.toString()}>
              {user.followerCount.label}
            </span>
          </button>
          {user.bioLinks.length > 0 && (
            <>
              <span>·</span>
              {user.bioLinks.map((link) => (
                <a
                  key={link.url}
                  class='hover:underline'
                  href={link.url}
                  rel='nofollow noreferrer'
                  target='_blank'
                >
                  {link.url.replace(/(^\w+:|^)\/\//, '')}
                </a>
              ))}
            </>
          )}
        </div>
        <div class='flex gap-4'>
          <a
            class='relative flex justify-center items-center group'
            aria-label='Instagram'
            href={`https://instagram.com/${user.username}`}
          >
            <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-[150%] h-[150%] transition-transform duration-200 group-hover:scale-100'></div>
            <InstagramIcon class='z-10 w-6 h-6 text-threads-white' />
          </a>
          <a
            class='relative flex justify-center items-center group'
            aria-label='Más'
            href=''
          >
            <div class='absolute bg-threads-dark-gray rounded-full scale-0 w-[150%] h-[150%] transition-transform duration-200 group-hover:scale-100'></div>
            <MoreIcon class='z-10 w-6 h-6 text-threads-white' />
          </a>
        </div>
      </div>
    </header>
  )
})
