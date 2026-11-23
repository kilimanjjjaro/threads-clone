import { component$, useComputed$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { MEDIA_TYPES } from '~/lib/constants'
import type { CloudinaryImageInterface } from '~/lib/interfaces/general'
import type { ReplyFacepileUser } from '~/lib/interfaces/threads'

interface Props {
  facepiles: ReplyFacepileUser[]
  username: string
}

export default component$(({ facepiles, username }: Props) => {
  const facepileCount = facepiles.length

  const images = useComputed$(async () => {
    const cloudinaryImages = facepiles.map(async (image) => {
      try {
        const uploadedImage = await uploadMedia({
          mediaUrl: image.profile_pic_url,
          type: MEDIA_TYPES.AVATAR
        })

        return uploadedImage
      } catch (error) {
        console.error(error)
      }
    })

    const images = await Promise.all(cloudinaryImages)

    return images.filter(
      (image) => image !== undefined
    ) as CloudinaryImageInterface[]
  })

  return (
    <div class='flex w-9 justify-center'>
      {facepileCount >= 2 && (
        <div class='relative h-[20px] w-[32px]'>
          {images.value.map((avatar, index) => (
            <Image
              key={avatar.url}
              class={`absolute overflow-hidden rounded-full object-cover object-center 
                  ${index === 0 && 'left-0 top-[2px]'}
                  ${
                    index === 1 &&
                    'left-[12px] top-0 border-[2.5px] border-threads-black'
                  }
                `}
              src={avatar.url}
              layout='constrained'
              width={index === 0 ? 16 : 20}
              height={index === 0 ? 16 : 20}
              alt={`${username}'s facepile avatar`}
            />
          ))}
        </div>
      )}
      {facepileCount === 1 && (
        <div class='relative h-8 w-8'>
          <Image
            class='absolute overflow-hidden rounded-full object-cover object-center'
            src={images.value[0].url}
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
