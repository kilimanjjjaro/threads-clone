import { IGNORED_ERRORS } from '../constants/e2e'
import type { BrowserError } from '../types/browser'

const NOT_FOUND_RESOURCE = 'the server responded with a status of 404'

export function unexpectedErrors(
  errors: BrowserError[],
  { notFoundUrl }: { notFoundUrl?: string } = {}
) {
  return errors
    .filter(
      ({ text, url }) =>
        !IGNORED_ERRORS.some(
          (ignored) => url.includes(ignored) || text.includes(ignored)
        )
    )
    .filter(
      ({ text, url }) =>
        notFoundUrl === undefined ||
        !(text.includes(NOT_FOUND_RESOURCE) && url === notFoundUrl)
    )
    .map(({ text, url }) => `${text} ${url}`.trim())
}
