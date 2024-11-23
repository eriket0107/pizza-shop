import { HttpHandler } from 'msw'

import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period.mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount.mock'
import { getManagedRestaurantMock } from './get-managed.mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-amount.mock'
import { getMonthOrdersAmountMock } from './get-month-order-amount.mock'
import { getMonthRevenueMock } from './get-month-revenue.mock'
import { getPopularProductsMock } from './get-popular-products.mock'
import { getProfileMock } from './get-profile.mock'
import { registerRestaurantMock } from './register-restaurant.mock'
import { signInMock } from './sign-in.mock'
import { updateProfileMock } from './update-profile.mock'

export default [
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getManagedRestaurantMock,
  getPopularProductsMock,
  getProfileMock,
  updateProfileMock,
] as HttpHandler[]
