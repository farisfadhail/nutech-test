export default class TransactionRepository {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  async createTransaction (
    invoiceNumber,
    userId,
    service,
    description,
    tx = this.prisma,
  ) {
    const result = await tx.$queryRaw`INSERT INTO "transactions" ("invoice_number",
                                                                  "user_id",
                                                                  "service_id",
                                                                  "service_code",
                                                                  "service_name",
                                                                  "total_amount",
                                                                  "description",
                                                                  "created_at")
                                      VALUES (${invoiceNumber},
                                              ${userId},
                                              ${service.id},
                                              ${service.service_code},
                                              ${service.service_name},
                                              ${service.service_tariff},
                                              ${description},
                                              NOW()) RETURNING *`

    return result[0]
  }

  async getTransactionByInvoiceNumber (userId, invoiceNumber) {
    const result = await this.prisma.$queryRaw`SELECT *
                                               FROM "transactions"
                                               WHERE "invoice_number" = ${invoiceNumber}
                                                 AND "user_id" = ${userId} LIMIT 1`

    return result[0]
  }

  async getHistoryTransactionsByUserId (userId) {
    return await this.prisma.$queryRaw`SELECT *
                                       FROM "transactions"
                                       WHERE "user_id" = ${userId}
                                       ORDER BY "created_at" DESC`
  }
}