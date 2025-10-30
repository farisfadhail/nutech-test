import { topUpSchema } from '../validations/topUpValidation.js'

export default class BalanceHandler {
  constructor ({ balanceService }) {
    this.balanceService = balanceService
  }

  async handleTopUp (req, res, next) {
    try {
      const validation = topUpSchema.safeParse(req.body)
      if (!validation.success) {
        const errors = validation.error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }))
        return res.status(400).json({ success: false, errors })
      }

      const userId = req.user.id

      var result = await this.balanceService.createTopUp(userId,
        validation.data.amount)

      return res.status(201).json({ message: 'Top-up successful', result })
    } catch (error) {
      next(error)
    }
  }

  async getBalanceByUserId (req, res) {
    try {
      const userId = req.user.id
      const balance = await this.balanceService.getBalanceByUserId(userId)
      res.status(200).json(balance)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }
}