import { server$ } from '@builder.io/qwik-city'

export const getUserId = server$(
  async ({ username }: { username?: string }) => {
    const response = await fetch(`https://www.threads.net/@${username}`, {
      headers: { 'sec-fetch-site': 'same-site' }
    })
    const data = await response.text()
    const userId = data.match(/"user_id":"(\d+)"/)?.[1]

    return userId
  }
)
