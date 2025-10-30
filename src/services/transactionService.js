import { generateInvoiceNumber } from '../utils/generateNumber.js'

export default class TransactionService {
  constructor ({
    transactionRepository,
    serviceRepository,
    balanceRepository,
    userRepository,
    prisma,
  }) {
    this.transactionRepository = transactionRepository
    this.serviceRepository = serviceRepository
    this.balanceRepository = balanceRepository
    this.userRepository = userRepository
    this.prisma = prisma
  }

  async payTransaction (userId, payload) {
    var user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw new Error('User not found for the given user ID')
    }

    var service = await this.serviceRepository.getServiceByCode(
      payload.service_code)
    if (!service) {
      throw new Error('Service not found for the given service code')
    }

    var balance = await this.balanceRepository.getBalanceByUserId(userId)
    if (!balance) {
      throw new Error('Balance not found for the given user ID')
    }

    if (Number(balance.balance) < Number(service.service_tariff)) {
      throw new Error('Insufficient balance for this transaction')
    }

    return await this.prisma.$transaction(async (tx) => {
      const invoiceNumber = generateInvoiceNumber()

      const transaction = await this.transactionRepository.createTransaction(
        invoiceNumber, userId, service, payload.description, tx)

      if (!transaction) {
        throw new Error('Transaction creation failed')
      }

      const newBalanceAmount = Number(balance.balance) -
        Number(service.service_tariff)

      const updatedBalance = await this.balanceRepository.updateBalance(
        userId, newBalanceAmount, tx)

      if (!updatedBalance) {
        throw new Error('Balance update failed')
      }

      return { transaction, balance: updatedBalance }
    })
  }

  async getTransactionByInvoiceNumber (userId, invoiceNumber) {
    var user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw new Error('User not found for the given user ID')
    }

    return await this.transactionRepository.getTransactionByInvoiceNumber(
      userId, invoiceNumber)
  }

  async getHistoryTransactionsByUserId (userId) {
    var user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw new Error('User not found for the given user ID')
    }

    return await this.transactionRepository.getHistoryTransactionsByUserId(
      userId)
  }
}