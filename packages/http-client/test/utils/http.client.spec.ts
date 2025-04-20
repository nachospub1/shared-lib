/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-magic-numbers */
import axios, { type AxiosInstance } from 'axios'

import { HttpClientError } from '../../src/errors'
import { type IHttpRequest } from '../../src/interfaces'
import { BaseHttpClient } from '../../src/utils/http.client'

jest.mock('axios')

describe('BaseHttpClient', () => {
  let httpClient: BaseHttpClient
  let mockAxiosInstance: jest.Mocked<AxiosInstance>

  beforeEach(() => {
    mockAxiosInstance = {
      request: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    } as any
    ;(axios.create as jest.Mock).mockReturnValue(mockAxiosInstance)

    httpClient = new BaseHttpClient()
  })

  it.skip('should execute a GET request', async () => {
    const payload: IHttpRequest = {
      url: 'https://www.mocksite.com/test',
      options: {
        headers: {
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        },
      },
    }
    mockAxiosInstance.request.mockResolvedValue({ data: { data: 'response' } })
    const response = await httpClient.get<{ data: string }>(payload)
    expect(response.data).toBe('response')
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: 'https://www.mocksite.com/test',
        headers: expect.objectContaining({
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        }),
      })
    )
  })

  it('should execute a POST request', async () => {
    const payload: IHttpRequest = {
      url: 'https://www.mocksite.com/test',
      options: {
        headers: {
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        },
        body: { key: 'value' },
      },
    }
    mockAxiosInstance.request.mockResolvedValue({ data: { data: 'response' } })
    const response = await httpClient.post<{ data: string }>(payload)
    expect(response.data).toBe('response')
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'https://www.mocksite.com/test',
        headers: expect.objectContaining({
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        }),
        data: { key: 'value' },
      })
    )
  })

  it('should execute a PUT request', async () => {
    const payload: IHttpRequest = {
      url: 'https://www.mocksite.com/test',
      options: {
        headers: {
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        },
        body: { key: 'value' },
      },
    }
    mockAxiosInstance.request.mockResolvedValue({ data: { data: 'response' } })
    const response = await httpClient.put<{ data: string }>(payload)
    expect(response.data).toBe('response')
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PUT',
        url: 'https://www.mocksite.com/test',
        headers: expect.objectContaining({
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        }),
        data: { key: 'value' },
      })
    )
  })

  it('should execute a PATCH request', async () => {
    const payload: IHttpRequest = {
      url: 'https://www.mocksite.com/test',
      options: {
        headers: {
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        },
        body: { key: 'value' },
      },
    }
    mockAxiosInstance.request.mockResolvedValue({ data: { data: 'response' } })
    const response = await httpClient.patch<{ data: string }>(payload)
    expect(response.data).toBe('response')
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PATCH',
        url: 'https://www.mocksite.com/test',
        headers: expect.objectContaining({
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        }),
        data: { key: 'value' },
      })
    )
  })

  it('should execute a DELETE request', async () => {
    const payload: IHttpRequest = {
      url: 'https://www.mocksite.com/test',
      options: {
        headers: {
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        },
      },
    }
    mockAxiosInstance.request.mockResolvedValue({ data: { data: 'response' } })
    const response = await httpClient.delete<{ data: string }>(payload)
    expect(response.data).toBe('response')
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'DELETE',
        url: 'https://www.mocksite.com/test',
        headers: expect.objectContaining({
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        }),
      })
    )
  })

  it('should throw HttpClientError on request failure', async () => {
    const payload: IHttpRequest = {
      url: 'https://www.mocksite.com/test',
      options: {
        query: { search: 'test' },
        headers: {
          Authorization: 'Bearer default-token',
          'Content-Type': 'application/json',
          'Custom-Header': 'value',
          'X-Custom-Header': 'CustomValue',
          traceid: 'unknown-traceid',
        },
      },
    }
    await expect(httpClient.get<{ data: string }>(payload)).rejects.toThrow(HttpClientError)
  })
})
