import { $, component$, useComputed$, useSignal } from '@builder.io/qwik'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { MEDIA_TYPES } from '~/lib/constants'
import UnmutedIcon from '~/components/icons/unmuted-icon'
import MutedIcon from '~/components/icons/muted-icon'

interface Props {
  videoUrl: string
}

export default component$(({ videoUrl }: Props) => {
  const videoRef = useSignal<HTMLVideoElement>()
  const isMuted = useSignal(true)

  const video = useComputed$(async () => {
    return await uploadMedia({ mediaUrl: videoUrl, type: MEDIA_TYPES.VIDEO })
  })

  const handleClick = $(() => {
    if (videoRef.value === undefined) return null

    if (videoRef.value.muted) {
      videoRef.value.muted = false
      isMuted.value = false
    } else {
      videoRef.value.muted = true
      isMuted.value = true
    }
  })

  return (
    <div
      class='relative overflow-hidden border border-threads-light-gray/20 rounded-lg max-h-[50vh]'
      style={{
        aspectRatio: video.value?.width / video.value?.height
      }}
    >
      <video
        ref={videoRef}
        class='absolute w-full h-full object-cover object-center'
        src={video.value?.url}
        width={640}
        muted
        autoPlay
        loop
      />
      <button
        class='absolute right-4 w-7 h-7 flex justify-center items-center bottom-4 rounded-full backdrop-blur-xl bg-[#282828]/50'
        onClick$={handleClick}
      >
        {isMuted.value ? (
          <UnmutedIcon classes='w-3 h-3 text-threads-white' />
        ) : (
          <MutedIcon classes='w-3 h-3 text-threads-white' />
        )}
      </button>
    </div>
  )
})
