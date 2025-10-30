import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'
const JWT_EXPIRES_IN = '1d'

export const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Token tidak valid atau sudah kadaluarsa')
  }
}

export const decodeToken = (token) => {
  return jwt.decode(token, { complete: true })
}