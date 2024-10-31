import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriod = {
  date: number
  receipt: number
}[]

export type GetDailyRevenueInPeriodParams = {
  from?: Date
  to?: Date
}
export async function getDailyRevenueInPeriod({from, to}: GetDailyRevenueInPeriodParams): Promise<GetDailyRevenueInPeriod> {
  const response = await api.get('/metrics/daily-receipt-in-period', {params: {
    from,
    to,
  }})

  return response.data
}
