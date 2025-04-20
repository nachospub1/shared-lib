/* eslint-disable no-magic-numbers */
import { HttpClientError } from '../../src/errors/http.client.error'

describe('HttpClientError', () => {
  it('should create an instance with the provided message and details', () => {
    const payload = { message: 'Custom error message', details: { info: 'Some details' } }
    const error = new HttpClientError(payload)

    expect(error.message).toBe('Custom error message')
    expect(error.details).toEqual({ info: 'Some details' })
    expect(error.status).toBe(500)
  })

  it('should handle payload with no details', () => {
    const payload = { message: 'Custom error message' }
    const error = new HttpClientError(payload)

    expect(error.message).toBe('Custom error message')
    expect(error.details).toBeUndefined()
    expect(error.status).toBe(500)
  })
})
