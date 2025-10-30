export default class UserRepository {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  async getAllUsers () {
    return this.prisma.$queryRaw`SELECT *
                                 FROM "users"`
  }

  async createUser (data, tx = this.prisma) {
    const result = await tx.$queryRaw`INSERT INTO "users" ("name", "email", "password")
                                      VALUES (${data.name},
                                              ${data.email},
                                              ${data.password}) RETURNING *`

    return result[0]
  }

  async getUserByEmail (email) {
    const result = await this.prisma.$queryRaw`SELECT *
                                               FROM "users"
                                               WHERE email = ${email} LIMIT 1`

    return result[0]
  }

  async getUserById (id) {
    const result = await this.prisma.$queryRaw`SELECT *
                                               FROM "users"
                                               WHERE id = ${id} LIMIT 1`

    return result[0]
  }
}
