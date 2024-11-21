import { HttpHandler } from 'msw'

import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period.mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount.mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-amount.mock'
import { getMonthOrdersAmountMock } from './get-month-order-amount.mock'
import { getMonthRevenueMock } from './get-month-revenue.mock'
import { getPopularProductsMock } from './get-popular-products.mock'
import { registerRestaurantMock } from './register-restaurant.mock'
import { signInMock } from './sign-in.mock'

export default [
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
] as HttpHandler[]
