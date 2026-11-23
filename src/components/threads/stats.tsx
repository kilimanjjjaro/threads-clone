import { component$, useComputed$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'

const ONE_LIKE = 1
const NO_DECIMALS = 0

interface Props {
  repliesCount: string
  likesCount: number
}

export default component$(({ repliesCount, likesCount }: Props) => {
  const likesText = useComputed$(() => {
    if (likesCount === ONE_LIKE) {
      return '1 like'
    } else if (likesCount > ONE_LIKE) {
      const formattedNumber = likesCount.toLocaleString('en-US', {
        style: 'decimal',
        useGrouping: true,
        minimumFractionDigits: NO_DECIMALS,
        maximumFractionDigits: NO_DECIMALS
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
