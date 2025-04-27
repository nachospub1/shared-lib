import { generateToken } from './generate.token'
import { validateToken } from './validate.token'
import { type IRefreshToken } from '../interfaces/jwt.interface'

/**
 * Refreshes a JWT token
 * @param payload
 * @returns a string containing the new token
 */
export const refreshToken = (payload: IRefreshToken): string => {
  const validated = validateToken({ token: payload.token, options: payload.options, secret: payload.secret })
  if (validated === null) {
    throw new Error('Invalid refresh token')
  }
  const { iat, exp, nbf, jti, ...rest } = validated as any
  return generateToken({ userClaims: rest, options: payload.options, secret: payload.secret })
}
