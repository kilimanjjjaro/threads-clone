import { component$, useComputed$ } from '@builder.io/qwik'
import type { BioLink } from '~/lib/interfaces/users'

interface Props {
  links: BioLink[]
}

export default component$(({ links }: Props) => {
  const hasBioLinks = useComputed$(() => links.some((link) => link.url !== ''))

  if (!hasBioLinks.value) return null

  return (
    <>
      <span>·</span>
      {links.map((link) => (
        <a
          key={link.url}
          class='xl:hover:underline overflow-ellipsis whitespace-nowrap overflow-hidden'
          href={link.url}
          rel='nofollow noreferrer'
          target='_blank'
        >
          {link.url.replace(/(^\w+:|^)\/\//, '')}
        </a>
      ))}
    </>
  )
})
