import { sign, verify } from 'jsonwebtoken'

import { type IValidateToken, type IGenerateToken, type IRefreshToken } from '../interfaces/jwt.interface'

export class JwtService {
  generateToken(payload: IGenerateToken): string {
    const { userClaims, options, secret } = payload
    const accessToken = sign(userClaims, secret, options)
    return accessToken
  }

  validateToken(payload: IValidateToken) {
    try {
      const { token, options, secret } = payload
      return verify(token, secret, options)
    } catch {
      return null
    }
  }

  refreshToken(payload: IRefreshToken) {
    const validated = this.validateToken({ token: payload.token, options: payload.options, secret: payload.secret })
    if (validated === null) {
      throw new Error('Invalid refresh token')
    }
    const { iat, exp, nbf, jti, ...rest } = validated as any
    return this.generateToken({ userClaims: rest, options: payload.options, secret: payload.secret })
  }
}
