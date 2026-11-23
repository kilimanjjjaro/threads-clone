import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import formatDate from '~/lib/utils/formatDate'
import {
  MONTH_AGO_DATE,
  NOW,
  RELATIVE_DATE_CASES,
  SECONDS_IN_A_MONTH
} from '../constants/unit'

const MS_IN_A_SECOND = 1000
const nowInSeconds = NOW.getTime() / MS_IN_A_SECOND

describe('formatDate', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: NOW })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each(RELATIVE_DATE_CASES)(
    '%i seconds ago is shown as "%s"',
    (secondsAgo, expected) => {
      expect(formatDate(nowInSeconds - secondsAgo)).toBe(expected)
    }
  )

  it.fails('posts older than a month show their date', () => {
    expect(formatDate(nowInSeconds - SECONDS_IN_A_MONTH)).toBe(MONTH_AGO_DATE)
  })
})
