import { $, component$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import VerifyIcon from '~/components/icons/verify-icon'
import { ModalContext } from '~/lib/context'
import { MODAL_CODES } from '~/lib/constants'

interface Props {
  avatar: string
  username: string
  isVerified: boolean
}

export default component$(({ avatar, username, isVerified }: Props) => {
  const { modalCode } = useContext(ModalContext)

  const openAvatarModal = $(() => (modalCode.value = MODAL_CODES.AVATAR))

  return (
    <div class='relative'>
      <button onClick$={openAvatarModal}>
        <Image
          class='rounded-full mx-auto'
          src={avatar}
          layout='constrained'
          width={84}
          height={84}
          alt={`${username}'s profile picture`}
        />
      </button>
      {isVerified && (
        <VerifyIcon classes='w-6 h-6 absolute left-[1.5px] bottom-[1.5px]' />
      )}
    </div>
  )
})
