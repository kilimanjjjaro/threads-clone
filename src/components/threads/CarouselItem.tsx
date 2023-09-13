/** @jsxImportSource react */

import { useEffect, useRef, useState } from 'react'
import { qwikify$ } from '@builder.io/qwik-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { MEDIA_TYPES } from '~/lib/constants'
import type { CarouselMedia } from '~/lib/interfaces/threads'
import type { CloudinaryImageInterface } from '~/lib/interfaces/general'
import 'swiper/css'

interface Props {
  images: CarouselMedia[] | null
  imagesCount: number | null
  username: string
}

function ReactComponent({ images, imagesCount, username }: Props) {
  if (images === null || imagesCount === null) return null

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [cloudinaryMedia, setCloudinaryMedia] = useState<
    CloudinaryImageInterface[]
  >([])

  useEffect(() => {
    const cloudinaryMedia = images.map(async (image) => {
      const isVideoPost = image.video_versions.length ? true : false
      let file = ''

      if (!isVideoPost) {
        file = image.image_versions2.candidates[0].url
      } else {
        file = image.video_versions[0].url
      }

      const media = {
        mediaUrl: file,
        type: !isVideoPost ? MEDIA_TYPES.IMAGE : MEDIA_TYPES.VIDEO
      }

      try {
        const uploadedImage = await uploadMedia(media)

        return uploadedImage
      } catch (error) {
        console.error(error)
      }
    })

    Promise.all(cloudinaryMedia).then((images) => {
      const filteredImages = images.filter(
        (image) => image !== undefined
      ) as CloudinaryImageInterface[]

      setCloudinaryMedia(filteredImages)
    })
  }, [])

  const slidesPerView = imagesCount >= 3 ? 'auto' : 2

  const handleClick = () => {
    if (videoRef.current === null) return null

    if (videoRef.current.muted) {
      videoRef.current.muted = false
      setIsMuted(false)
    } else {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }

  return (
    <div className='w-auto overflow-hidden'>
      <Swiper className='mt-2' slidesPerView={slidesPerView} spaceBetween={6}>
        {cloudinaryMedia.map((media) => (
          <SwiperSlide
            key={media.url}
            className='relative overflow-hidden border rounded-lg border-threads-light-gray/20'
            style={{
              aspectRatio: `${media.width}/${media.height}`,
              width: slidesPerView === 'auto' ? 230 : '100%',
              height: 'auto'
            }}
          >
            {MEDIA_TYPES.IMAGE === media.type && (
              <img
                className='absolute object-cover object-center w-full h-full'
                src={media.url}
                alt={`${username}'s thread image`}
                width={'auto'}
                height={'auto'}
                loading='lazy'
              />
            )}
            {MEDIA_TYPES.VIDEO === media.type && (
              <div>
                <video
                  ref={videoRef}
                  className='absolute object-cover object-center w-full h-full'
                  src={media.url}
                  width={'auto'}
                  height={'auto'}
                  muted
                  autoPlay
                  loop
                />
                <button
                  className='absolute right-4 w-7 h-7 flex justify-center items-center bottom-4 rounded-full backdrop-blur-xl bg-[#282828]/50'
                  onClick={handleClick}
                >
                  {isMuted ? (
                    <svg
                      className='w-3 h-3 text-threads-white'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-label='Audio is playing'
                      viewBox='0 0 24 24'
                      color='currentColor'
                      fill='currentColor'
                    >
                      <path d='M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z'></path>
                    </svg>
                  ) : (
                    <svg
                      className='w-3 h-3 text-threads-white'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-label='Audo is muted'
                      viewBox='0 0 48 48'
                      color='currentColor'
                      fill='currentColor'
                    >
                      <path
                        clipRule='evenodd'
                        d='M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z'
                        fillRule='evenodd'
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export const CarouselItem = qwikify$(ReactComponent, { eagerness: 'idle' })
