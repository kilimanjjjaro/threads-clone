import {
  THREADS_APP_ID,
  THREADS_APP_LSD,
  THREADS_GRAPHQL_PATH
} from '~/lib/constants'
import { logError } from '~/lib/utils/logger'
import { threadsOrigin } from '~/lib/utils/origins'

interface Props {
  documentId: number
  userId: string
}

// Only called from server$ functions, so it always runs on the server.
export async function fetchData<T>({
  documentId,
  userId
}: Props): Promise<T | undefined> {
  const variables = {
    userID: userId,
    __relay_internal__pv__BarcelonaIsSableEnabledrelayprovider: false,
    __relay_internal__pv__BarcelonaIsSuggestedUsersOnProfileEnabledrelayprovider: false,
    __relay_internal__pv__BarcelonaShouldShowFediverseM075Featuresrelayprovider: false
  }

  const body = `lsd=${THREADS_APP_LSD}&jazoest=2931&variables=${JSON.stringify(
    variables
  )}&doc_id=${documentId}`

  try {
    const response = await fetch(`${threadsOrigin()}${THREADS_GRAPHQL_PATH}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'x-ig-app-id': THREADS_APP_ID,
        'x-fb-lsd': THREADS_APP_LSD,
        'sec-fetch-site': 'same-site'
      },
      body
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- the threads api response is not validated at runtime
    return await (response.json() as Promise<T>)
  } catch (error) {
    logError(error)
    return undefined
  }
}
