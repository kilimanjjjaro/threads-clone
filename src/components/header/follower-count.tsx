import { component$, useComputed$ } from '@builder.io/qwik'

interface Props {
  count: number
}

export default component$(({ count }: Props) => {
  const followerCountFormated = useComputed$(() => {
    let label = ''
    let formattedCount = ''

    if (count >= 1000000) {
      formattedCount = (count / 1000000).toFixed(1) + 'M'
    } else if (count >= 1000) {
      formattedCount = (count / 1000).toFixed(1) + 'K'
    }

    label = formattedCount + ' followers'

    return {
      count: count.toLocaleString('en-US'),
      label: label
    }
  })

  return (
    <span class='whitespace-nowrap' title={followerCountFormated.value.count}>
      {followerCountFormated.value.label}
    </span>
  )
})
