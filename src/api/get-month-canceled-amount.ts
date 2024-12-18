import { api } from '@/lib/axios'

export type GetMonthCanceledOrdersAmountResponse = {
  amount: number
  diffFromLastMonth: number
}
export async function getMonthCanceledOrdersAmount(): Promise<GetMonthCanceledOrdersAmountResponse> {
  const response = await api.get('/metrics/month-canceled-orders-amount')

  return response.data
}
