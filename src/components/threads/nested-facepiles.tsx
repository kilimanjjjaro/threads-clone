import { component$, useComputed$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import {
  FIRST_AVATAR,
  ONE_FACEPILE,
  PAIR_LAYOUT,
  SINGLE_AVATAR,
  TWO_FACEPILES,
  uploadFacepiles
} from '~/components/threads/facepile-layout'
import type { ReplyFacepileUser } from '~/lib/interfaces/threads'

interface Props {
  facepiles: ReplyFacepileUser[]
  username: string
}

export default component$(({ facepiles, username }: Props) => {
  const { length: facepileCount } = facepiles

  const images = useComputed$(async () => await uploadFacepiles(facepiles))

  return (
    <div class='flex w-9 justify-center'>
      {facepileCount >= TWO_FACEPILES && (
        <div class='relative h-[20px] w-[32px]'>
          {images.value
            .slice(FIRST_AVATAR, PAIR_LAYOUT.length)
            .map((avatar, index) => (
              <Image
                key={avatar.url}
                class={`absolute overflow-hidden rounded-full object-cover object-center ${PAIR_LAYOUT[index].position}`}
                src={avatar.url}
                layout='constrained'
                width={PAIR_LAYOUT[index].size}
                height={PAIR_LAYOUT[index].size}
                alt={`${username}'s facepile avatar`}
              />
            ))}
        </div>
      )}
      {facepileCount === ONE_FACEPILE && (
        <div class='relative h-8 w-8'>
          {images.value.slice(FIRST_AVATAR, ONE_FACEPILE).map((avatar) => (
            <Image
              key={avatar.url}
              class='absolute overflow-hidden rounded-full object-cover object-center'
              src={avatar.url}
              layout='constrained'
              width={SINGLE_AVATAR}
              height={SINGLE_AVATAR}
              alt={`${username}'s facepile avatar`}
            />
          ))}
        </div>
      )}
    </div>
  )
})
