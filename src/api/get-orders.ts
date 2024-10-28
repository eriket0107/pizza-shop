import { api } from '@/lib/axios'

export type GetOrdersQuery = {
  pageIndex: number | null
}
export type GetOrdersResponse = {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
}: GetOrdersQuery): Promise<GetOrdersResponse> {
  const response = await api.get('/orders', {
    params: {
      pageIndex,
    },
  })
  console.log(response.data)
  return response.data
}
