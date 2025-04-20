/* eslint-disable no-magic-numbers */
export const SupportedMethods = {
  head: 'HEAD',
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
} as const

export type SupportedMethod = (typeof SupportedMethods)[keyof typeof SupportedMethods]

export const DefaultHeaders = {
  authorization: 'Authorization',
  xCustomHeader: 'X-Custom-Header',
  contentType: 'Content-Type',
} as const

export const defaultErrorMessage = 'HTTP_CLIENT_ERROR'
