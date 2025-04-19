import { type IProviderConfig } from '../interfaces'
import { buildOAuthUrl, getOauthUrlParameters } from '../utils'

/**
 * Base class for OAuth providers.
 * This class should be extended by all OAuth providers.
 * It provides a common interface for getting the authorization URL and access token.
 * @abstract
 * @class BaseOAuthProvider
 */
export abstract class BaseOAuthProvider {
  /**
   * The configuration object for the OAuth provider.
   * This object should contain the client ID, client secret, and other configuration options.
   * @type {IProviderConfig}
   * @memberof BaseOAuthProvider
   * @protected
   */
  protected config!: IProviderConfig

  constructor(config: IProviderConfig) {
    this.config = config
  }

  /**
   * Gets the authorization URL for the OAuth provider.
   * This URL should be used to redirect the user to the OAuth provider's authorization page.
   * @param config The configuration object for the OAuth provider.
   * @returns {Promise<string>} The authorization URL.
   * @memberof BaseOAuthProvider
   */
  async getAuthorizationUrl(config: IProviderConfig): Promise<string> {
    const parameters = getOauthUrlParameters(config)
    const url = buildOAuthUrl(config.authorizeUrl, parameters)
    return url
  }

  /**
   * Gets the access token for the OAuth provider.
   * This method should be called after the user has authorized the application and returned to the redirect URL.
   * @param code The authorization code returned by the OAuth provider after the user has authorized the application.
   * @param config The configuration object for the OAuth provider.
   * @returns {Promise<string>} The access token.
   * @memberof BaseOAuthProvider
   */
  async getAccessToken(code: string, config: IProviderConfig): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
