import { type IProviderConfig, type IOAuthExecution } from '../interfaces'
import { buildOAuthUrl, getOauthUrlParameters } from '../utils'

/**
 * Base class for OAuth providers
 */
export abstract class BaseOAuthProvider {
  /**
   * Configuration for the OAuth provider
   */
  protected config: IProviderConfig

  /**
   * Constructor for the BaseOAuthProvider class
   * @param config - Parameters for the OAuth provider
   */
  constructor(config: IProviderConfig) {
    this.config = config
  }

  /**
   * Get the authorization URL for the OAuth provider
   * @param config - Configuration for the OAuth provider
   * @returns
   */
  getAuthUrl(): string {
    const { authorizeUrl, callbackUrl, clientId, scope } = this.config
    const parsedScope = scope?.join(' ') ?? ''
    const parameters = getOauthUrlParameters({ callbackUrl, clientId, scope: parsedScope })
    const url = buildOAuthUrl(authorizeUrl, parameters)
    return url
  }

  /**
   * Exchange the authorization code for an access token
   * @param code
   */
  abstract exchangeCodeForToken(code: string): IOAuthExecution

  /**
   * Get the user profile from the OAuth provider
   * @param accessToken
   */
  abstract getUserProfile(accessToken: string): IOAuthExecution
}
