import { type IProviderConfig } from '../interfaces'

/**
 * Get params for Oauth token acquisition
 * @param config
 * @returns URLSearchParams
 * @example
 * const config = {
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   callbackUrl: 'your-callback-url',
 *   code: 'your-authorization-code',
 * }
 * const params = getOauthTokenParameters(config)
 */
export const getOauthTokenParameters = (config: IProviderConfig & { code: string }): URLSearchParams => {
  const parameters = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: config.code,
    redirect_uri: config.callbackUrl,
    grant_type: 'authorization_code',
  })
  return parameters
}
