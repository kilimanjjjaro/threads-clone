import { server$ } from '@builder.io/qwik-city'
import { GRAPHQL_ENDPOINT, THREADS_APP_ID } from '~/lib/constants'

export const fetchData = server$(
  async ({
    documentId,
    variables
  }: {
    documentId: number
    variables: { userID: string }
  }) => {
    const body = `lsd=jdFoLBsUcm9h-j90PeanuC&jazoest=21926&variables=${JSON.stringify(
      variables
    )}&doc_id=${documentId}`

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'user-agent': 'Threads API midu client',
          'x-ig-app-id': THREADS_APP_ID,
          'x-fb-lsd': 'jdFoLBsUcm9h-j90PeanuC',
          'sec-fetch-site': 'same-site'
        },
        body: body
      })

      const data = await response.json()

      return data
    } catch (error) {
      console.error(error)
    }
  }
)
