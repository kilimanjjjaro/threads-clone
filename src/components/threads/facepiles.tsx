import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import getRandomIndex from '~/lib/utils/getRandomIndex'
import { AVATARS } from '~/lib/constants'
import type { ReplyFacepileUser } from '~/lib/interfaces/threads'

interface Props {
  facepiles: ReplyFacepileUser[]
  username: string
}

export default component$(({ facepiles, username }: Props) => {
  const facepileCount = facepiles.length

  return (
    <div class='w-9 flex justify-center'>
      {facepileCount >= 3 && (
        <div class='relative w-[40px] h-[35px]'>
          {facepiles.map((avatar, index) => (
            <Image
              key={avatar.id}
              class={`absolute object-cover object-center aspect-square overflow-hidden rounded-lg
                  ${index === 0 && 'top-0 right-0'}
  
                  ${index === 1 && 'top-[7px] left-0'}
  
                  ${index === 2 && 'bottom-0 left-[13px]'}
                `}
              src={AVATARS[getRandomIndex(AVATARS.length)]}
              layout='constrained'
              width={index === 0 ? 20 : index === 1 ? 16 : 12}
              height={index === 0 ? 20 : index === 1 ? 16 : 12}
              alt={`${username}'s facepile avatar`}
            />
          ))}
        </div>
      )}
      {facepileCount === 2 && (
        <div class='relative w-[32px] h-[20px]'>
          {facepiles.map((avatar, index) => (
            <Image
              key={avatar.id}
              class={`absolute object-cover object-center aspect-square overflow-hidden rounded-lg
                  ${index === 0 && 'top-[2px] left-0'}
                  ${
                    index === 1 &&
                    'top-0 left-[12px] border-[2.5px] border-threads-black'
                  }
                `}
              src={AVATARS[getRandomIndex(AVATARS.length)]}
              layout='constrained'
              width={index === 0 ? 16 : 20}
              height={index === 0 ? 16 : 20}
              alt={`${username}'s facepile avatar`}
            />
          ))}
        </div>
      )}
      {facepileCount === 1 && (
        <div class='relative w-8 h-8'>
          <Image
            class='absolute object-cover object-center aspect-square overflow-hidden rounded-lg'
            src={AVATARS[4]}
            layout='constrained'
            width={36}
            height={36}
            alt={`${username}'s facepile avatar`}
          />
        </div>
      )}
    </div>
  )
})
