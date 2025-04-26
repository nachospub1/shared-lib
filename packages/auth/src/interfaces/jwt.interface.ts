import { type VerifyOptions, type SignOptions } from 'jsonwebtoken'

export interface IGenerateToken {
  userClaims: Record<string, string>
  secret: string
  options: SignOptions
}

export interface IValidateToken {
  token: string
  secret: string
  options: VerifyOptions
}

export interface IRefreshToken {
  token: string
  secret: string
  options: SignOptions
}
