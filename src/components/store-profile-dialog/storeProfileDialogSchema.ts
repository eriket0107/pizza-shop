import { z } from 'zod'

export const storeProfileDialogSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

export type StoreProfileDialogSchema = z.infer<typeof storeProfileDialogSchema>
