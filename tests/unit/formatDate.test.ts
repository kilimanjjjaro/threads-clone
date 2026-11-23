import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import formatDate from '~/lib/utils/formatDate'
import { MS_IN_A_SECOND, NOW } from '../constants/unit'
import RELATIVE_DATE_CASES from '../constants/relative-date-cases.json'

const nowInSeconds = NOW.getTime() / MS_IN_A_SECOND

describe('formatDate', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: NOW })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each(RELATIVE_DATE_CASES)(
    '$secondsAgo seconds ago is shown as "$expected"',
    ({ secondsAgo, expected }) => {
      expect(formatDate(nowInSeconds - secondsAgo)).toBe(expected)
    }
  )
})
