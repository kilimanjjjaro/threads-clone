import { describe, expect, it } from 'vitest'
import { threadsResponseShape, userResponseShape } from '../constants/schemas'
import {
  PROFILE_HTML,
  fixtureUser,
  rawThreadsResponse,
  rawUserResponse
} from '../utils/fixtures'
import { shapeErrors } from '../utils/shape'

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
    const user: Record<string, unknown> = {
      ...fixtureUser(),
      follower_count: '5.8M'
    }
    delete user.username

    expect(shapeErrors({ data: { user } }, userResponseShape)).toEqual([
      '$.data.user.username: expected string, got undefined',
      '$.data.user.follower_count: expected number, got string'
    ])
  })
})
