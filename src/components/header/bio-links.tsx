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
          class='overflow-hidden overflow-ellipsis whitespace-nowrap xl:hover:underline'
          href={link.url}
          rel='nofollow noreferrer'
          target='_blank'
        >
          {link.url.replace(/(?:^\w+:|^)\/\/(?:www\.)?/v, '')}
        </a>
      ))}
    </>
  )
})
