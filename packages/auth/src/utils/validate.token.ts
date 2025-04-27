import { verify, type JwtPayload } from 'jsonwebtoken'

import { type IValidateToken } from '../interfaces/jwt.interface'

/**
 * Validates a JWT token
 * @param payload
 * @returns a JwtPayload object or null if the token is not valid
 */
export const validateToken = (payload: IValidateToken): JwtPayload | null => {
  try {
    const { token, options, secret } = payload
    return verify(token, secret, options) as JwtPayload
  } catch {
    return null
  }
}
