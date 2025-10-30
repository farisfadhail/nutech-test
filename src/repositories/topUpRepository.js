export default class TopUpRepository {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  async createTopUp (userId, amount, tx = this.prisma) {
    const result = await tx.$queryRaw`INSERT INTO "top_ups" ("user_id", "amount", "created_at")
                                      VALUES (${userId},
                                              ${amount},
                                              NOW()) RETURNING *`

    return result[0]
  }
}