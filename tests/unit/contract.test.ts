import { describe, expect, it } from 'vitest'
import { threadsResponseShape, userResponseShape } from '../constants/schemas'
import {
  PROFILE_HTML,
  rawThreadsResponse,
  rawUserResponse,
  userResponse
} from '../utils/fixtures'
import { shapeErrors } from '../utils/shape'

// The fixtures are trimmed copies of real Threads responses. If they are
// refreshed and the API changed shape, these tests point at the field.

describe('threads api contract', () => {
  it('the profile response has every field the app reads', () => {
    expect(shapeErrors(rawUserResponse(), userResponseShape)).toEqual([])
  })

  it('the threads response has every field the app reads', () => {
    expect(shapeErrors(rawThreadsResponse(), threadsResponseShape)).toEqual([])
  })

  it('the profile page exposes the user id where getUserId looks for it', () => {
    expect(PROFILE_HTML).toMatch(/"user_id":"\d+"/v)
  })

  it('reports the path of a field that changed', () => {
    const response = userResponse() as unknown as {
      data: { user: Record<string, unknown> }
    }
    response.data.user.follower_count = '5.8M'
    delete response.data.user.username

    expect(shapeErrors(response, userResponseShape)).toEqual([
      '$.data.user.username: expected string, got undefined',
      '$.data.user.follower_count: expected number, got string'
    ])
  })
})
