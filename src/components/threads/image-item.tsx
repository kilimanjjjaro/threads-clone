import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { DEFAULT_THREAD_IMAGE } from '~/lib/constants'

interface Props {
  username: string
}

export default component$(({ username }: Props) => {
  return (
    <div class='relative aspect-square overflow-hidden border border-threads-light-gray/20 rounded-lg mb-2'>
      <Image
        class='absolute w-full h-full object-cover'
        src={DEFAULT_THREAD_IMAGE}
        layout='constrained'
        alt={`${username}'s thread image`}
        width={600}
        aspectRatio={1}
      />
    </div>
  )
})
