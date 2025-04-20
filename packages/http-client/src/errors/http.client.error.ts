/* eslint-disable no-magic-numbers */

/**
 * Custom error class for Http Client errors
 */
export class HttpClientError extends Error {
  /**
   * Http Status code
   */
  public readonly status: number
  /**
   * An object with more details about the error
   */
  public details?: Record<string, unknown>
  /**
   * Error type. In this case, HttpClientError
   */
  public readonly errorType: string
  /**
   * Creation timestamp
   */
  public readonly createdAt: Date

  /**
   * Constructor for HttpClientError
   * @param payload - Error payload
   */
  constructor(payload: IBaseError) {
    super('HTTP_CLIENT_ERROR')
    this.status = payload.status ?? 500
    this.details = { message: payload.message, ...payload.details }
    this.errorType = 'HttpClientError'
    this.createdAt = payload.createdAt ?? new Date()
  }
}

/**
 * Defines the base custom error input
 */
interface IBaseError {
  /**
   * Error message or title
   */
  message: string
  /**
   * Error stack. Optional
   */
  stack?: string
  /**
   * Http Status code. Optional, each custom error has its own code
   */
  status?: number
  /**
   * An object with more details about the error
   */
  details?: Record<string, unknown>
  /**
   * Creation timestamp. Optional, defaults to current timestamp
   */
  createdAt?: Date
}
