import { z } from 'zod'

export const createTransactionSchema = z.object({
  service_code: z.string(),
  description: z.string().optional(),
})

export const updateTransactionStatusSchema = z.object({
  status: z.enum(['SUCCESS', 'FAILED']),
})