import { component$, useComputed$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { MEDIA_TYPES } from '~/lib/constants'

interface Props {
  username: string
  imageUrl: string
}

export default component$(({ imageUrl, username }: Props) => {
  const image = useComputed$(async () => {
    return await uploadMedia({ mediaUrl: imageUrl, type: MEDIA_TYPES.IMAGE })
  })

  return (
    <div
      class='relative max-h-[50vh] overflow-hidden rounded-lg border border-threads-light-gray/20'
      style={{
        aspectRatio: image.value?.width / image.value?.height
      }}
    >
      <Image
        class='absolute h-full w-full object-cover object-center'
        src={image.value?.url}
        layout='constrained'
        alt={`${username}'s thread image`}
        width={640}
        aspectRatio={image.value?.width / image.value?.height}
        loading='lazy'
      />
    </div>
  )
})
