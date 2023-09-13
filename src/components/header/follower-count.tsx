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
      count: count.toString(),
      label: label
    }
  })

  return (
    <button
      class='xl:hover:underline whitespace-nowrap'
      onClick$={() => console.log('clicked')}
    >
      <span title={followerCountFormated.value.count}>
        {followerCountFormated.value.label}
      </span>
    </button>
  )
})
