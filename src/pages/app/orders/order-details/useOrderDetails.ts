import { useQuery } from '@tanstack/react-query'

import { getOrdersDetails } from '@/api/get-order-details'

export const useOrderDetails = ({
  orderId,
  isOpen,
}: {
  orderId: string
  isOpen: boolean
}) => {
  const { data: order } = useQuery({
    queryKey: ['order-details', orderId],
    queryFn: () => getOrdersDetails({ orderId }),
    enabled: isOpen,
  })

  return {
    order,
  }
}
