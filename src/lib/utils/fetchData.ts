import { server$ } from '@builder.io/qwik-city'
import { THREADS_APP_ID } from '~/lib/constants'

interface Props {
  documentId: number
  variables: { userID?: string; postID?: string }
}

export const fetchData = server$(async ({ documentId, variables }: Props) => {
  const body = `lsd=AVq00Gb0kjA&jazoest=21926&variables=${JSON.stringify(
    variables
  )}&doc_id=${documentId}`

  try {
    const response = await fetch('https://www.threads.net/api/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'x-ig-app-id': THREADS_APP_ID,
        'x-fb-lsd': 'AVq00Gb0kjA',
        'sec-fetch-site': 'same-site'
      },
      body: body
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
  }
})
