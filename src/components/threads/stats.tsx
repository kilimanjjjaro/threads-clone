import { component$, useComputed$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

interface Props {
  repliesCount: string
  likesCount: number
}

export default component$(({ repliesCount, likesCount }: Props) => {
  const likesText = useComputed$(() => {
    if (likesCount === 1) {
      return '1 like'
    } else if (likesCount > 1) {
      const formattedNumber = likesCount.toLocaleString('en-US', {
        style: 'decimal',
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      return `${formattedNumber} likes`
    } else {
      return ''
    }
  })

  return (
    <div class='flex gap-[6px] text-threads-light-gray'>
      <Link href='#' class='xl:hover:underline'>
        {repliesCount}
      </Link>
      <span>·</span>
      <span>{likesText.value}</span>
    </div>
  )
})
