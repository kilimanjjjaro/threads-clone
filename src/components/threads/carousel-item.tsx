import {
  type QwikMouseEvent,
  component$,
  useSignal,
  $,
  useVisibleTask$,
  Slot,
  useStylesScoped$
} from '@builder.io/qwik'

type SliderParam = {
  slidesPerView: number
  spaceBetween: number
}

interface CarouselProps {
  sliderParam: SliderParam
}

export const Carousel = component$(({ sliderParam }: CarouselProps) => {
  const sliderRef = useSignal<HTMLDivElement>()
  const widthSlider = useSignal<number>(0)
  const isDragging = useSignal(false)
  const startX = useSignal<number>(0)
  const startScrollLeft = useSignal<number>(0)

  const dragStart = $((e: QwikMouseEvent<HTMLDivElement, MouseEvent>) => {
    isDragging.value = true
    sliderRef.value?.classList.add('dragging')
    startX.value = e.pageX
    startScrollLeft.value = sliderRef.value?.scrollLeft || 0
  })

  const dragStop = $(() => {
    isDragging.value = false
    sliderRef.value?.classList.remove('dragging')
  })

  const dragging = $((e: QwikMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (sliderRef.value == undefined || !isDragging.value) return
    sliderRef.value.scrollLeft =
      startScrollLeft.value - (e.pageX - startX.value)
  })

  const nextSlider = $(() => {
    if (sliderRef.value == undefined) return
    sliderRef.value.scrollLeft += widthSlider.value / sliderParam.slidesPerView
  })

  const prevSlider = $(() => {
    if (sliderRef.value == undefined) return
    sliderRef.value.scrollLeft -= widthSlider.value / sliderParam.slidesPerView
  })

  useVisibleTask$(() => {
    if (sliderRef.value) {
      widthSlider.value = sliderRef.value.clientWidth
    }
    const applyDraggable = (element: Element) => {
      element.setAttribute('draggable', 'false')
      const children = element.children
      for (let i = 0; i < children.length; i++) {
        applyDraggable(children[i])
      }
    }

    const divElement = sliderRef.value?.querySelectorAll('.slider-slide')
    console.log(divElement)
    if (divElement) {
      divElement.forEach((el) => {
        applyDraggable(el)
      })
    }
  })

  useStylesScoped$(`
    .slider {
      position: relative;
      max-width: 1200px;
      width: 100%;
    }
    
    
    .slider-wrapper {
      box-sizing: border-box;
      display: grid;    
      grid-auto-flow: column;
      grid-auto-columns: calc((100% / 1) - 23px);
      gap: 24px;
      overflow: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: 0;
    }
    .slider-wrapper::-webkit-scrollbar{
      display: none;
    }
    
    .slider-wrapper.dragging {
      scroll-snap-type: none;
      scroll-behavior: auto;
    }
    .slider-slide{
      scroll-snap-align: start;
      cursor: pointer;
      height: 100%;
    }
    .slider-wrapper.dragging .slider-slide{
      cursor: grab;
      user-select: none;
      /* pointer-events: none; */
    }
    
    .slider-button-next,
    .slider-button-prev {
      position: absolute;
      top: -3.8em;
      z-index: 10;
      cursor: pointer;
      background-color: var(--first-color-alt);
      border: 1px solid var(--border-color);
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: var(--first-color);
      font-size: var(--tiny-font-size);
    
      &>svg {
        font-size: 1.3em;
      }
    }
    
    .slider-button-prev {
      left: initial;
      right: 2.5rem;
    }
    
    .slider-button-next {
      right: 0;
    }
  `)

  return (
    <div class='slider'>
      <div
        class='slider-wrapper'
        style={{
          gridAutoColumns: `${
            (widthSlider.value -
              sliderParam.spaceBetween * (sliderParam.slidesPerView - 1)) /
            sliderParam.slidesPerView
          }px`,
          gap: `${sliderParam.spaceBetween}px`
        }}
        ref={sliderRef}
        onMouseMove$={dragging}
        onMouseDown$={dragStart}
        onMouseUp$={dragStop}
        onMouseLeave$={dragStop}
      >
        <Slot />
      </div>
      <div class='slider-button-next' onClick$={nextSlider}>
        &gt;
      </div>
      <div class='slider-button-prev' onClick$={prevSlider}>
        &lt;
      </div>
    </div>
  )
})

export default Carousel
