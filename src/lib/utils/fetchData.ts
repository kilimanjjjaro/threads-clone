import { server$ } from '@builder.io/qwik-city'
import {
  THREADS_APP_ID,
  THREADS_APP_LSD,
  THREADS_ENDPOINT
} from '~/lib/constants'

interface Props {
  documentId: number
  userId: string
}

export const fetchData = server$(async ({ documentId, userId }: Props) => {
  const variables = {
    userID: userId,
    __relay_internal__pv__BarcelonaIsSableEnabledrelayprovider: false,
    __relay_internal__pv__BarcelonaIsSuggestedUsersOnProfileEnabledrelayprovider:
      false,
    __relay_internal__pv__BarcelonaShouldShowFediverseM075Featuresrelayprovider:
      false
  }

  const body = `lsd=${THREADS_APP_LSD}&jazoest=2931&variables=${JSON.stringify(
    variables
  )}&doc_id=${documentId}`

  try {
    const response = await fetch(THREADS_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'x-ig-app-id': THREADS_APP_ID,
        'x-fb-lsd': THREADS_APP_LSD,
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
