import { server$ } from '@builder.io/qwik-city'
import { threadsOrigin } from '~/lib/utils/origins'

export const getUserId = server$(
  async ({ username }: { username?: string }) => {
    const response = await fetch(`${threadsOrigin()}/@${username}`, {
      headers: { 'sec-fetch-site': 'same-site' }
    })
    const data = await response.text()
    const userId = data.match(/"user_id":"(\d+)"/)?.[1]

    return userId
  }
)
