import {
  $,
  component$,
  useComputed$,
  useSignal,
  useVisibleTask$
} from '@builder.io/qwik'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { aspectRatio } from '~/lib/utils/mediaUrls'
import { MEDIA_TYPES } from '~/lib/constants'
import UnmutedIcon from '~/components/icons/unmuted-icon'
import MutedIcon from '~/components/icons/muted-icon'

const FULLY_VISIBLE = 1

interface Props {
  videoUrl: string
}

export default component$(({ videoUrl }: Props) => {
  const videoRef = useSignal<HTMLVideoElement>()
  const isMuted = useSignal(true)

  const video = useComputed$(
    async () =>
      await uploadMedia({ mediaUrl: videoUrl, type: MEDIA_TYPES.VIDEO })
  )

  const handleClick = $(() => {
    const { value: player } = videoRef
    if (player === undefined) return

    player.muted = !player.muted
    const { muted } = player
    isMuted.value = muted
  })

  // Play the video only while it is fully on screen.
  useVisibleTask$((task) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.value === undefined) return

        if (entry.isIntersecting) {
          void videoRef.value.play()
        } else {
          videoRef.value.pause()
        }
      },
      { threshold: FULLY_VISIBLE }
    )

    if (videoRef.value !== undefined) observer.observe(videoRef.value)

    task.cleanup(() => {
      observer.disconnect()
    })
  })

  return (
    <div
      class='relative max-h-[50vh] overflow-hidden rounded-lg border border-threads-light-gray/20'
      style={{ aspectRatio: aspectRatio(video.value) }}
    >
      <video
        ref={videoRef}
        class='absolute h-full w-full object-cover object-center'
        src={video.value?.url}
        width={640}
        muted
        loop
      />
      <button
        class='absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#282828]/50 backdrop-blur-xl'
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
