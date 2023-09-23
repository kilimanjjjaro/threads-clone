import { component$, useContext } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userData: user } = useContext(UserContext)

  return (
    <div class='flex py-4 px-4 items-center justify-between bg-[#181818] border border-threads-white/5 rounded-2xl'>
      <span class='text-threads-white font-semibold text-balance'>
        Log in to see more from {user.username}.
      </span>
      <Link
        class='px-4 pt-1 pb-[6px] rounded-[10px] text-threads-white font-semibold border border-threads-white/[0.15] duration-300 ease-in-out active:scale-90 xl:hover:border-threads-white/40'
        href='/'
      >
        Log in
      </Link>
    </div>
  )
})
