import { sign } from 'jsonwebtoken'

import { type IGenerateToken } from '../interfaces/jwt.interface'

/**
 * Generates a JWT token
 * @param payload
 * @returns a string containing the token
 */
export const generateToken = (payload: IGenerateToken): string => {
  const { userClaims, options, secret } = payload
  const token = sign(userClaims, secret, options)
  return token
}
