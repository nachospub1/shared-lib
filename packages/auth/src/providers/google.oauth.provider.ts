import { type IOAuthExecution } from '../interfaces/'
import { BaseOAuthProvider } from '../models/base.oauth.provider'

/**
 * Google OAuth provider
 * @extends BaseOAuthProvider
 */
export class GoogleOAuthProvider extends BaseOAuthProvider {
  exchangeCodeForToken(code: string): IOAuthExecution {
    const { tokenUrl, clientId, clientSecret, callbackUrl } = this.config
    const query = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: callbackUrl,
      grant_type: 'authorization_code',
    })
    const url = `${tokenUrl}?${query.toString()}`
    return {
      url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  }

  getUserProfile(accessToken: string): IOAuthExecution {
    const { userInfoUrl } = this.config
    return {
      url: userInfoUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  }
}
