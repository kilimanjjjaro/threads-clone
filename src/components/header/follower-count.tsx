import { component$, useComputed$ } from '@builder.io/qwik'

const MILLION = 1_000_000
const THOUSAND = 1000
const DECIMALS = 1

interface Props {
  count: number
}

export default component$(({ count }: Props) => {
  const followerCountFormated = useComputed$(() => {
    let formattedCount = ''

    if (count >= MILLION) {
      formattedCount = `${(count / MILLION).toFixed(DECIMALS)}M`
    } else if (count >= THOUSAND) {
      formattedCount = `${(count / THOUSAND).toFixed(DECIMALS)}K`
    }

    const label = `${formattedCount} followers`

    return {
      count: count.toLocaleString('en-US'),
      label
    }
  })

  return (
    <span class='whitespace-nowrap' title={followerCountFormated.value.count}>
      {followerCountFormated.value.label}
    </span>
  )
})
