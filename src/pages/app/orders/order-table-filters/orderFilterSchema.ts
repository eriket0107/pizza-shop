import { z } from 'zod'

export const orderFilterSchema = z.object({
  customerName: z.string().optional(),
  status: z.string().optional(),
  orderId: z.string().optional(),
})

export type OrderFilter = z.infer<typeof orderFilterSchema>
