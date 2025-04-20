/* eslint-disable no-magic-numbers */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import rTracer from 'cls-rtracer'
import { lastValueFrom, from, delay, timeout, retry, catchError, type Observable } from 'rxjs'

import { DefaultHeaders, type SupportedMethod, SupportedMethods } from '../constants/default.values'
import { HttpClientError } from '../errors'
import { type IHttpRequest } from '../interfaces'

/**
 * Base class for HTTP Client. Supports all common methods, handles traceability based on main request traceId, and outputs custom error with all relevant data
 */
export class BaseHttpClient {
  protected readonly httpClient: AxiosInstance

  /**
   * Constructor for BaseHttpClient
   * @param axiosInstance Optional
   */
  constructor(axiosInstance?: AxiosInstance) {
    this.httpClient = axiosInstance ?? axios.create()
  }

  /**
   * Executes a HEAD request
   * @param payload
   * @returns
   */
  async head<T>(payload: IHttpRequest): Promise<T> {
    return await this.request<T>(SupportedMethods.head, payload)
  }

  /**
   * Executes a GET request
   * @param payload
   * @returns
   */
  async get<T>(payload: IHttpRequest): Promise<T> {
    return await this.request<T>(SupportedMethods.get, payload)
  }

  /**
   * Executes a POST request
   * @param payload
   * @returns
   */
  async post<T>(payload: IHttpRequest): Promise<T> {
    return await this.request<T>(SupportedMethods.post, payload)
  }

  /**
   * Executes a PUT request
   * @param payload
   * @returns
   */
  async put<T>(payload: IHttpRequest): Promise<T> {
    return await this.request<T>(SupportedMethods.put, payload)
  }

  /**
   * Executes a PATCH request
   * @param payload
   * @returns
   */
  async patch<T>(payload: IHttpRequest): Promise<T> {
    return await this.request<T>(SupportedMethods.patch, payload)
  }

  /**
   * Executes a DELETE request
   * @param payload
   * @returns
   */
  async delete<T>(payload: IHttpRequest): Promise<T> {
    return await this.request<T>(SupportedMethods.delete, payload)
  }

  /**
   * Executes a request of supported methods
   * @param method Request method (GET | POST | PATCH | PUT | DELETE)
   * @param payload
   * @returns
   */
  private async request<T>(method: SupportedMethod, payload: IHttpRequest): Promise<T> {
    const { url, options } = payload
    const fullUrl = this.buildUrl(url, options?.params, options?.query)
    const headers = this.getHeaders(options?.headers ?? {})

    const config: AxiosRequestConfig = {
      method,
      url: fullUrl,
      headers,
      data: options?.body,
    }

    let observable$ = from(this.httpClient.request<T>(config))
    observable$ = this.setOptions(observable$, options)

    const response: AxiosResponse<T> = await lastValueFrom(
      from(
        observable$.pipe(
          catchError((error) => {
            throw new HttpClientError({
              message: error.message,
              details: {
                error: error?.response?.statusText ?? 'Unknown',
                status: error?.response?.status ?? 500,
                data: error?.response?.data,
              },
            })
          })
        )
      )
    )
    return response.data
  }

  private setOptions<T>(observable$: Observable<AxiosResponse<T, any>>, options: IHttpRequest['options']): Observable<AxiosResponse<T, any>> {
    if (options === undefined) {
      return observable$
    }
    const { delayMs = 0, timeoutMs = 0, retryCount = 0 } = options
    if (delayMs > 0) {
      observable$ = observable$.pipe(delay(delayMs))
    }

    if (timeoutMs > 0) {
      observable$ = observable$.pipe(timeout(timeoutMs))
    }

    if (retryCount > 0) {
      observable$ = observable$.pipe(retry(retryCount))
    }

    return observable$
  }

  /**
   * Builds the url for the request
   * @param url Base url
   * @param parameters Path params
   * @param query Query params
   * @returns
   */
  protected buildUrl(url: string, parameters: Record<string, string> = {}, query: Record<string, string | number> = {}): string {
    let fullUrl = url
    for (const [key, value] of Object.entries(parameters)) {
      fullUrl = fullUrl.replace(`:${key}`, value)
    }
    const queryString = new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)])).toString()
    const response = queryString.length > 0 ? `${fullUrl}?${queryString}` : fullUrl
    return response
  }

  /**
   * Gets the headers for the request, based on custom + default headers
   * @param customHeaders
   * @returns
   */
  protected getHeaders(customHeaders: Record<string, string | number>): Record<string, string | number> {
    const traceId = (rTracer.id() as string) ?? 'unknown-traceid'
    const mergedHeaders = {
      ...this.getDefaultHeaders(),
      ...customHeaders,
      traceid: traceId,
    }
    return mergedHeaders
  }

  /**
   * Returns the default headers
   * @returns
   */
  protected getDefaultHeaders(): Record<string, string> {
    return {
      [DefaultHeaders.contentType]: 'application/json',
    }
  }
}
