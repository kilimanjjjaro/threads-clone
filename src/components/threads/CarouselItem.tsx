/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import getRandomIndex from '~/lib/utils/getRandomIndex'
import { THREAD_IMAGES } from '~/lib/constants'
import type { CarouselMedia } from '~/lib/interfaces/threads'
import 'swiper/css'

interface Props {
  images: CarouselMedia[] | null
  imagesCount: number | null
}

function ReactComponent({ images, imagesCount }: Props) {
  if (images === null || imagesCount === null) return null

  const slidesPerView = imagesCount >= 3 ? 'auto' : 2

  return (
    <Swiper className='mt-2' slidesPerView={slidesPerView} spaceBetween={6}>
      {images.map((image) => {
        const randomIndex = getRandomIndex(THREAD_IMAGES.length)

        return (
          <SwiperSlide
            key={image.id}
            className='relative overflow-hidden border rounded-lg border-threads-light-gray/20'
            style={{
              aspectRatio: `${image.original_width}/${image.original_height}`,
              width: slidesPerView === 'auto' ? 240 : '100%'
            }}
          >
            <img
              className='absolute object-cover object-center w-full h-full'
              src={THREAD_IMAGES[randomIndex]}
              width={'auto'}
              height={'auto'}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export const CarouselItem = qwikify$(ReactComponent, { eagerness: 'load' })
