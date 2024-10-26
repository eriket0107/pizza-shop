import { api } from '@/lib/axios'

export type SignInBody = {
  email: string
}

export async function signIn(body: SignInBody) {
  await api.post('/authenticate', body)
}
