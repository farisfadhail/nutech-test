import { comparePassword, hashPassword } from '../utils/password.js'
import { toUserResource } from '../resources/userResource.js'
import { generateToken } from '../utils/jwt.js'

export default class UserService {
  constructor ({ userRepository, balanceRepository, prisma }) {
    this.userRepository = userRepository
    this.balanceRepository = balanceRepository
    this.prisma = prisma
  }

  async registerUser (payload) {
    const existing = await this.userRepository.getUserByEmail(payload.email)
    if (existing && existing.length > 0) throw new Error(
      'Email sudah terdaftar')

    const hashedPassword = await hashPassword(payload.password)

    const newUser = await this.prisma.$transaction(async (tx) => {
      const newUser = await this.userRepository.createUser({
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
      }, tx)

      await this.balanceRepository.createBalance({
        userId: newUser.id,
        balance: 0,
      }, tx)

      return newUser
    })

    return generateToken({ id: newUser.id, email: newUser.email })
  }

  async loginUser (payload) {
    const user = await this.userRepository.getUserByEmail(payload.email)
    if (!user) throw new Error('Email atau password salah')

    const isPasswordValid = await comparePassword(payload.password,
      user.password)
    if (!isPasswordValid) throw new Error('Email atau password salah')

    return generateToken({ id: user.id, email: user.email })
  }

  async getAllUsers () {
    const users = await this.userRepository.getAllUsers()

    return users.map(user => toUserResource(user))
  }
}