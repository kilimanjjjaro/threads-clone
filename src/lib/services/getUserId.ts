import { server$ } from '@builder.io/qwik-city'
import axios from 'axios'

export const getUserId = server$(
  async ({ username }: { username?: string }) => {
    const response = await axios.get(`https://www.threads.net/@${username}`, {
      headers: { 'sec-fetch-site': 'same-site' }
    })

    const userId = response.data.match(/"user_id":"(\d+)"/)?.[1]

    return userId
  }
)
