import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import getRandomIndex from '~/lib/utils/getRandomIndex'
import { THREAD_IMAGES } from '~/lib/constants'

interface Props {
  username: string
}

export default component$(({ username }: Props) => {
  return (
    <div class='relative aspect-square overflow-hidden border border-threads-light-gray/20 rounded-lg'>
      <Image
        class='absolute w-full h-full object-cover'
        src={THREAD_IMAGES[getRandomIndex(THREAD_IMAGES.length)]}
        layout='constrained'
        alt={`${username}'s thread image`}
        width={600}
        aspectRatio={1}
      />
    </div>
  )
})
