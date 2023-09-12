import { component$, useComputed$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { MEDIA_TYPES } from '~/lib/constants'
import type { CloudinaryImageInterface } from '~/lib/interfaces/general'
import type { ThreadItem } from '~/lib/interfaces/threads'

interface Props {
  thread: ThreadItem
}

export default component$(({ thread }: Props) => {
  const facepileCount = thread.reply_facepile_users.length

  const facepiles = useComputed$(async () => {
    const cloudinaryImages = thread.reply_facepile_users
      .slice(0, 2)
      .map(async (image) => {
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
    <div class='w-9 flex justify-center'>
      {facepileCount >= 2 && (
        <div class='relative w-[32px] h-[20px]'>
          {facepiles.value.map((avatar, index) => (
            <Image
              key={avatar.url}
              class={`absolute object-cover object-center aspect-square overflow-hidden rounded-lg
                  ${index === 0 && 'top-[2px] left-0'}
                  ${
                    index === 1 &&
                    'top-0 left-[12px] border-[2.5px] border-threads-black'
                  }
                `}
              src={avatar.url}
              layout='constrained'
              width={index === 0 ? 16 : 20}
              height={index === 0 ? 16 : 20}
              alt={`${thread.post.user.username}'s facepile avatar`}
            />
          ))}
        </div>
      )}
      {facepileCount === 1 && (
        <div class='relative w-8 h-8'>
          <Image
            class='absolute object-cover object-center aspect-square overflow-hidden rounded-lg'
            src={facepiles.value[0].url}
            layout='constrained'
            width={36}
            height={36}
            alt={`${thread.post.user.username}'s facepile avatar`}
          />
        </div>
      )}
    </div>
  )
})
