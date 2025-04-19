import { type IProviderConfig } from '../interfaces'

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
   * @returns {Promise<string>} The authorization URL.
   * @memberof BaseOAuthProvider
   */
  async getAuthorizationUrl(provider: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  /**
   * Gets the access token for the OAuth provider.
   * This method should be called after the user has authorized the application and returned to the redirect URL.
   * @param code The authorization code returned by the OAuth provider after the user has authorized the application.
   * @returns {Promise<string>} The access token.
   * @memberof BaseOAuthProvider
   */
  async getAccessToken(code: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
