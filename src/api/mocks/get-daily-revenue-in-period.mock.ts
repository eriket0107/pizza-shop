import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriod } from '../get-daily-revenue-in-period'
export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriod
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/11/2024', receipt: 2000 },
    { date: '02/11/2024', receipt: 800 },
    { date: '03/11/2024', receipt: 8000 },
    { date: '04/11/2024', receipt: 540 },
    { date: '05/11/2024', receipt: 400 },
    { date: '06/11/2024', receipt: 700 },
    { date: '07/11/2024', receipt: 1000 },
  ])
})
