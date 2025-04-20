/**
 * Payload for an HTTP request
 */
export interface IHttpRequest {
  /**
   * The target url
   */
  url: string

  /**
   * An options set with all necessary inputs to send the request
   */
  options?: {
    /**
     * Path params. Optional
     */
    params?: Record<string, string>
    /**
     * Query params. Optional
     */
    query?: Record<string, string | number>
    /**
     * Headers. Optional
     */
    headers?: Record<string, string | number>
    /**
     * Body. Optional
     */
    body?: unknown
    /**
     * Retry count. Optional
     */
    retryCount?: number
    /**
     * Retry timeout in milliseconds. Optional
     */
    timeoutMs?: number
    /**
     * Retry delay in milliseconds. Optional
     */
    delayMs?: number
  }
}
