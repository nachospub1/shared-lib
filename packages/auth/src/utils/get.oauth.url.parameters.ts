/**
 * Get params for Oauth url building
 * @param config
 * @returns URLSearchParams
 * @example
 * const config = {
 *   clientId: 'your-client-id',
 *   callbackUrl: 'your-callback-url',
 *   scope: ['scope1', 'scope2'],
 * }
 * const params = getOauthUrlParameters(config)
 */
export const getOauthUrlParameters = (config: { clientId: string; callbackUrl: string; scope: string }): URLSearchParams => {
  const parameters = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.callbackUrl,
    response_type: 'code',
    scope: config.scope ?? '',
    access_type: 'offline',
    prompt: 'consent',
  })
  return parameters
}
