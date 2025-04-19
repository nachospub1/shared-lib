/**
 * Defines an Oauth provider configuration object
 */
export interface IProviderConfig {
    /**
     * Authorization URL. See provider documentation for more details.
     * @example https://accounts.google.com/o/oauth2/auth
     */
    authorizeUrl: string
    /**
     * Token URL. See provider documentation for more details.
     * @example https://oauth2.googleapis.com/token
     */
    tokenUrl: string
    /**
     * User info URL. See provider documentation for more details.
     * @example https://www.googleapis.com/oauth2/v3/userinfo
     */
    userInfoUrl: string
    /**
     * Scopes to request from the user. See provider documentation for more details.
     * @example ['openid', 'email', 'profile']
     */
    scope?: string[]
    /**
     * Client ID. See provider documentation for more details.
     */
    clientId: string
    /**
     * Client secret. See provider documentation for more details.
     */
    clientSecret: string
    /**
     * Callback URL required by provider. See provider documentation for more details.
     * @example https://yourapp.com/auth/callback
     */
    callbackUrl: string
  }