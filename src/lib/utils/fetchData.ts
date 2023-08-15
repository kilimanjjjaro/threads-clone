import axios from 'axios'
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

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': 'Threads clone by kilimanjjjaro.com',
      'x-ig-app-id': THREADS_APP_ID,
      'x-fb-lsd': 'jdFoLBsUcm9h-j90PeanuC'
    }

    try {
      const response = await axios.post(GRAPHQL_ENDPOINT, body, { headers })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)
