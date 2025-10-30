export default class BalanceService {
  constructor ({ balanceRepository, topUpRepository, userRepository, prisma }) {
    this.balanceRepository = balanceRepository
    this.topUpRepository = topUpRepository
    this.userRepository = userRepository
    this.prisma = prisma
  }

  async getBalanceByUserId (userId) {
    const balance = await this.balanceRepository.getBalanceByUserId(userId)

    if (!balance) throw new Error('Balance not found for the given user ID')

    return balance
  }

  async createTopUp (userId, amount) {
    var user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw new Error('User not found for the given user ID')
    }

    return await this.prisma.$transaction(async (tx) => {
      const topUp = await this.topUpRepository.createTopUp(userId, amount, tx)

      if (!topUp) {
        throw new Error('Top-up creation failed')
      }

      const balance = await this.balanceRepository.getBalanceByUserId(
        userId, tx)

      if (!balance) {
        throw new Error('Balance not found for the given user ID')
      }
      
      const newBalanceAmount = Number(balance.balance) + amount

      const updatedBalance = await this.balanceRepository.updateBalance(
        userId, newBalanceAmount, tx)

      if (!updatedBalance) {
        throw new Error('Balance update failed')
      }

      return { balance: updatedBalance, top_up_amount: topUp.amount }
    })
  }
}