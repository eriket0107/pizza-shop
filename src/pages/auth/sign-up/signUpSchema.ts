import { z } from 'zod'

export const signUpFormSchema = z.object({
  email: z.string().email(),
})

export type SignUpForm = z.infer<typeof signUpFormSchema>
