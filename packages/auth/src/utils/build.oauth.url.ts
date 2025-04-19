/**
 * Builds an authorization URL for OAuth 2.0 authentication.
 * @param baseUrl The base URL of the authorization server.
 * @param parameters The URL parameters to be included in the authorization request.
 * @returns The complete authorization URL.
 * @example
 * const baseUrl = 'https://example.com/oauth/authorize'
 * const parameters = new URLSearchParams({
 *   client_id: 'your-client-id',
 *   redirect_uri: 'your-redirect-uri',
 *   response_type: 'code',
 *   scope: 'read write',
 *   state: 'your-state',
 * })
 * const authUrl = buildAuthUrl(baseUrl, parameters) 
 */
export const buildAuthUrl = (baseUrl: string, parameters: URLSearchParams): string => {
    const url = `${baseUrl}?${parameters.toString()}`
    return url
  }