import { describe, expect, it } from 'vitest'
import formatLinks from '~/lib/utils/formatLinks'
import { XSS_PAYLOAD } from '../constants/unit'

describe('formatLinks', () => {
  it('turns mentions into profile links', () => {
    expect(formatLinks('Introducing @Muse, the agent')).toBe(
      'Introducing <a href="/@Muse">@Muse</a>, the agent'
    )
  })

  it('links every mention, including underscores and digits', () => {
    expect(formatLinks('@meta_glasses and @user2')).toBe(
      '<a href="/@meta_glasses">@meta_glasses</a> and <a href="/@user2">@user2</a>'
    )
  })

  it('leaves text without mentions untouched', () => {
    expect(formatLinks('No mentions here')).toBe('No mentions here')
  })

  it.fails('escapes html so a bio or caption cannot inject markup', () => {
    const html = formatLinks(XSS_PAYLOAD)

    expect(html).not.toContain('<img')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('<a href="/@zuck">@zuck</a>')
  })
})
