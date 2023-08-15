import { component$, useComputed$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import VerifyIcon from '~/components/icons/verify-icon'
import { uploadAvatar } from '~/lib/utils/uploadAvatar'

interface Props {
  avatar: string
  fullName: string
  isVerified: boolean
}

export default component$(({ avatar, fullName, isVerified }: Props) => {
  const avatarUrl = useComputed$(async () => {
    return (await uploadAvatar(avatar)) as string
  })

  return (
    <div class='relative'>
      <button onClick$={() => console.log('clicked')}>
        <Image
          class='rounded-full'
          src={avatarUrl.value}
          layout='constrained'
          width={84}
          height={84}
          alt={`Foto de perfil de ${fullName}`}
          cdn='cloudinary'
        />
      </button>
      {isVerified && (
        <VerifyIcon classes='w-6 h-6 absolute left-[1.5px] bottom-[1.5px]' />
      )}
    </div>
  )
})
