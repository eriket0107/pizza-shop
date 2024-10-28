import { api } from '@/lib/axios'

export type GetOrdersDetailsParams = {
  orderId: string
}

export type GetOrdersDetailsResponse = {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrdersDetails({
  orderId,
}: GetOrdersDetailsParams): Promise<GetOrdersDetailsResponse> {
  const reponse = await api.get(`/orders/${orderId}`)

  return reponse.data
}
