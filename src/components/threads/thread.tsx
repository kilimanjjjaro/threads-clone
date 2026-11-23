import { component$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import ThreadHeader from '~/components/threads/thread-header'
import ThreadMedia from '~/components/threads/thread-media'
import Buttons from '~/components/threads/buttons'
import Stats from '~/components/threads/stats'
import Facepiles from '~/components/threads/facepiles'
import NestedFacepiles from '~/components/threads/nested-facepiles'
import BunIcon from '~/components/icons/bun-icon'
import { UserContext } from '~/lib/context'
import getThreadType from '~/lib/utils/getThreadType'
import formatLinks from '~/lib/utils/formatLinks'
import type { ThreadItem } from '~/lib/interfaces/threads'

interface Props {
  thread: ThreadItem
  nestedItem: boolean
  multipleItems: boolean
}

export default component$(({ thread, nestedItem, multipleItems }: Props) => {
  const { userData: user } = useContext(UserContext)
  const { post } = thread
  const { isCarouselPost } = getThreadType(thread)
  const startsThread = !nestedItem && multipleItems

  return (
    <article key={post.id}>
      <div class='flex w-full gap-3'>
        <div class='flex flex-col items-center gap-2'>
          <Image
            class='rounded-full'
            src={user.profile_pic_url}
            layout='constrained'
            width={36}
            height={36}
            alt={`${post.user.username}'s profile picture`}
          />
          <div class='relative flex h-full w-full flex-col items-center'>
            <div
              class='w-[2px] bg-[#333638]'
              style={{ height: startsThread ? 'calc(100% - 26px)' : '100%' }}
            />
            {startsThread && (
              <BunIcon classes='stroke-[#333638] absolute bottom-px right-[15px]' />
            )}
          </div>
        </div>
        <div class={`w-full ${isCarouselPost && 'overflow-hidden'}`}>
          <ThreadHeader post={post} />
          {post.caption !== null && (
            <p
              class='blue-links mb-2 text-threads-white'
              dangerouslySetInnerHTML={formatLinks(post.caption.text)}
            />
          )}

          <ThreadMedia thread={thread} />

          <Buttons />
          {startsThread && (
            <div class='mt-3 mb-2 flex items-center gap-3'>
              <NestedFacepiles
                facepiles={thread.reply_facepile_users}
                username={post.user.username}
              />
              <Stats
                repliesCount={thread.view_replies_cta_string}
                likesCount={post.like_count}
              />
            </div>
          )}
        </div>
      </div>
      {!startsThread && (
        <footer class='mt-2 flex items-center gap-2'>
          <Facepiles
            facepiles={thread.reply_facepile_users}
            username={post.user.username}
          />
          <Stats
            repliesCount={thread.view_replies_cta_string}
            likesCount={post.like_count}
          />
        </footer>
      )}
    </article>
  )
})
