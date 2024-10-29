import { useMutation, useQueryClient } from '@tanstack/react-query'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'

export const useOrderTableRow = () => {
  const queryClient = useQueryClient()

  const updateStatusOnCache = async (orderId: string, status: OrderStatus) => {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) return { ...order, status }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelling } = useMutation({
    mutationFn: cancelOrder,
    mutationKey: ['cancel-order'],
    onSuccess: (_, { orderId }) => updateStatusOnCache(orderId, 'canceled'),
  })

  const { mutateAsync: approveOrderFn, isPending: isApproving } = useMutation({
    mutationFn: approveOrder,
    mutationKey: ['approved-order'],
    onSuccess: (_, { orderId }) => updateStatusOnCache(orderId, 'processing'),
  })

  const { mutateAsync: deliverOrderFn, isPending: isDelivering } = useMutation({
    mutationFn: deliverOrder,
    mutationKey: ['deliver-order'],
    onSuccess: (_, { orderId }) => updateStatusOnCache(orderId, 'delivered'),
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatching } =
    useMutation({
      mutationFn: dispatchOrder,
      mutationKey: ['deliver-order'],
      onSuccess: (_, { orderId }) => updateStatusOnCache(orderId, 'delivering'),
    })

  return {
    cancelOrderFn,
    approveOrderFn,
    deliverOrderFn,
    dispatchOrderFn,
    isCancelling,
    isApproving,
    isDelivering,
    isDispatching,
  }
}
