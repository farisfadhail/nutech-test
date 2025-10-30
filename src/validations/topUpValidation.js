import { z } from 'zod'

export const topUpSchema = z.object({
  amount: z.number().min(10000, 'Jumlah top-up minimal adalah 10.000'),
})