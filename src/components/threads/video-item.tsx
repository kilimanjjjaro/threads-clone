import { $, component$, useComputed$, useSignal } from '@builder.io/qwik'
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

  const playWhileVisible = $((_: Event, player: HTMLVideoElement) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void player.play()
        } else {
          player.pause()
        }
      },
      { threshold: FULLY_VISIBLE }
    )

    observer.observe(player)
  })

  return (
    <div
      class='relative max-h-[50vh] overflow-hidden rounded-lg border border-threads-light-gray/20'
      style={{ aspectRatio: aspectRatio(video.value) }}
    >
      <video
        ref={videoRef}
        onQVisible$={playWhileVisible}
        class='absolute h-full w-full object-cover object-center'
        src={video.value?.url}
        width={640}
        muted
        loop
      />
      <button
        class='absolute right-4 bottom-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#282828]/50 backdrop-blur-xl'
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
