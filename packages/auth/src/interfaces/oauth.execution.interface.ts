/**
 * Defines an interface to execute an OAuth operation such as token exchange or user info retrieval.
 */
export interface IOAuthExecution {
  url: string
  headers?: Record<string, string>
}
