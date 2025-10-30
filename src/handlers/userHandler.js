import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/userValidation.js'

export default class UserHandler {
  constructor ({ userService }) {
    this.userService = userService
  }

  async registerUser (req, res, next) {
    try {
      const validation = registerUserSchema.safeParse(req.body)
      if (!validation.success) {
        const errors = validation.error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }))
        return res.status(400).json({ success: false, errors })
      }

      const user = await this.userService.registerUser(validation.data)
      res.status(201).json({ message: 'User berhasil dibuat', user })
    } catch (err) {
      next(err)
    }
  }

  async loginUser (req, res, next) {
    try {
      const validation = loginUserSchema.safeParse(req.body)
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors })
      }

      const user = await this.userService.loginUser(validation.data)
      res.status(200).json({ message: 'Login berhasil', user })
    } catch (err) {
      next(err)
    }
  }

  async getAllUsers (req, res, next) {
    try {
      const users = await this.userService.getAllUsers()
      res.status(200).json({ users })
    } catch (err) {
      next(err)
    }
  }
}