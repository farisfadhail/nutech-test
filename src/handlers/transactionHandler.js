import {
  createTransactionSchema,
} from '../validations/transactionValidation.js'

export default class TransactionHandler {
  constructor ({ transactionService }) {
    this.transactionService = transactionService
  }

  async payTransaction (req, res, next) {
    try {
      const userId = req.user.id

      var validation = createTransactionSchema.safeParse(req.body)
      if (!validation.success) {
        const errors = validation.error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }))
        return res.status(400).json({ success: false, errors })
      }

      const result = await this.transactionService.payTransaction(userId,
        validation.data)

      return res.status(201).json({ message: 'Transaction successful', result })
    } catch (error) {
      next(error)
    }
  }

  async getTransactionByInvoiceNumber (req, res, next) {
    try {
      const invoiceNumber = req.params.invoiceNumber
      const userId = req.user.id

      const transaction = await this.transactionService.getTransactionByInvoiceNumber(
        userId, invoiceNumber)
      res.status(200).json(transaction)
    } catch (error) {
      next(error)
    }
  }

  async getHistoryTransactionsByUserId (req, res, next) {
    try {
      const userId = req.user.id

      const transactions = await this.transactionService.getHistoryTransactionsByUserId(
        userId)
      res.status(200).json({ transactions })
    } catch (error) {
      next(error)
    }
  }
}