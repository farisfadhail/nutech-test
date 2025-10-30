export default class BalanceRepository {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  async getBalanceByUserId (userId) {
    const result = await this.prisma.$queryRaw`SELECT *
                                               FROM "balances"
                                               WHERE "user_id" = ${userId} LIMIT 1`

    return result[0]
  }

  async createBalance (data, tx = this.prisma) {
    return tx.$queryRaw`INSERT INTO "balances" ("user_id", "balance")
                        VALUES (${data.userId},
                                ${data.balance}) RETURNING *`
  }

  async updateBalance (userId, newBalance, tx = this.prisma) {
    const result = await tx.$queryRaw`UPDATE "balances"
                                      SET "balance" = ${newBalance}
                                      WHERE "user_id" = ${userId} RETURNING *`

    return result[0]
  }
}