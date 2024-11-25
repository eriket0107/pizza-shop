import { http, HttpResponse } from 'msw'

import {
  GetOrdersDetailsParams,
  GetOrdersDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrdersDetailsParams,
  never,
  GetOrdersDetailsResponse
>('/order/:orderId', async ({ params }) => {
  return HttpResponse.json({
    createdAt: new Date().toISOString(),
    customer: {
      email: 'johndoe@example.com',
      name: 'John Doe',
      phone: '999999999',
    },
    id: params.orderId,
    orderItems: [
      {
        id: 'custom-id-1',
        priceInCents: 1000,
        product: {
          name: 'Pizza 01',
        },
        quantity: 1,
      },
      {
        id: 'custom-id-2',
        priceInCents: 2000,
        product: {
          name: 'Pizza 02',
        },
        quantity: 2,
      },
    ],
    totalInCents: 5000,
    status: 'pending',
  })
})
