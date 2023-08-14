import { component$, useComputed$ } from '@builder.io/qwik'

interface Props {
  count: number
}

export default component$(({ count }: Props) => {
  const followerCountFormated = useComputed$(() => {
    let label = ''

    if (count >= 1000000) {
      label = Math.round(count / 1000000) + ' mill. of followers'
    } else if (count >= 1000) {
      label = Math.round(count / 1000) + ' k of followers'
    } else {
      label = count + ' of followers'
    }

    return {
      count: count.toString(),
      label: label
    }
  })

  return (
    <button class='hover:underline' onClick$={() => console.log('clicked')}>
      <span title={followerCountFormated.value.count}>
        {followerCountFormated.value.label}
      </span>
    </button>
  )
})
