export default class ServiceRepository {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  async getServiceByCode (code) {
    const result = await this.prisma.$queryRaw`SELECT *
                                               FROM "services"
                                               WHERE "service_code" = ${code}
                                                 AND "is_active" = TRUE LIMIT 1`

    return result[0]
  }

  async getAllServices () {
    return await this.prisma.$queryRaw`SELECT *
                                       FROM "services"
                                       ORDER BY "service_name" ASC`
  }
}