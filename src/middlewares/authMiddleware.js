import { verifyToken } from '../utils/jwt.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan atau format tidak valid',
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    const { userRepository } = req.container.cradle

    var userByEmail = await userRepository.getUserByEmail(decoded.email)
    if (!userByEmail) return res.status(404).
      json({ message: 'User tidak ditemukan' })

    req.user = { id: userByEmail.id, email: userByEmail.email }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau sudah kadaluarsa',
    })
  }
}