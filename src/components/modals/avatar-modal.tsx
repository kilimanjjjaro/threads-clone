import { component$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userData: user } = useContext(UserContext)

  return (
    <Image
      class='rounded-full border-4 border-[#0a0a0a] mx-auto aspect-square w-64'
      src={user.profile_pic_url}
      layout='constrained'
      width={256}
      height={256}
      alt={`${user.username}'s profile picture`}
      cdn='cloudinary'
    />
  )
})
