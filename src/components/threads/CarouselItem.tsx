/** @jsxImportSource react */

import { useEffect, useState } from 'react'
import { qwikify$ } from '@builder.io/qwik-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { uploadMedia } from '~/lib/utils/uploadMedia'
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

  const [cloudinaryImages, setCloudinaryImages] = useState<
    CloudinaryImageInterface[]
  >([])

  useEffect(() => {
    const cloudinaryImages = images.map(async (image) => {
      try {
        const uploadedImage = await uploadMedia({
          mediaUrl: image.image_versions2.candidates[0].url,
          type: 'images'
        })
        return uploadedImage
      } catch (error) {
        console.error(error)
      }
    })

    Promise.all(cloudinaryImages).then((images) => {
      const filteredImages = images.filter(
        (image) => image !== undefined
      ) as CloudinaryImageInterface[]

      setCloudinaryImages(filteredImages)
    })
  }, [])

  const slidesPerView = imagesCount >= 3 ? 'auto' : 2

  return (
    <div className='w-auto overflow-hidden'>
      <Swiper className='mt-2' slidesPerView={slidesPerView} spaceBetween={6}>
        {cloudinaryImages.map((image) => (
          <SwiperSlide
            key={image.url}
            className='relative overflow-hidden border rounded-lg border-threads-light-gray/20'
            style={{
              aspectRatio: `${image.width}/${image.height}`,
              width: slidesPerView === 'auto' ? 230 : '100%',
              height: 'auto'
            }}
          >
            <img
              className='absolute object-cover object-center w-full h-full'
              src={image.url}
              alt={`${username}'s thread image`}
              width={'auto'}
              height={'auto'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export const CarouselItem = qwikify$(ReactComponent, { eagerness: 'load' })
