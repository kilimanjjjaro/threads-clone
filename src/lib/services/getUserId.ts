import { server$ } from '@builder.io/qwik-city'
import { threadsOrigin } from '~/lib/utils/origins'

const USER_ID_PATTERN = /"user_id":"(?<userId>\d+)"/v

export const getUserId = server$(
  async ({ username }: { username?: string }) => {
    const response = await fetch(`${threadsOrigin()}/@${username}`, {
      headers: { 'sec-fetch-site': 'same-site' }
    })
    const page = await response.text()

    return USER_ID_PATTERN.exec(page)?.groups?.userId
  }
)
