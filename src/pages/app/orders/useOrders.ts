import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'

import { OrderFilter } from './order-table-filters/orderFilterSchema'

export const useOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { customerName, orderId, status }: OrderFilter = {
    customerName: searchParams.get('customerName') ?? '',
    status: searchParams.get('status') ?? 'all',
    orderId: searchParams.get('orderId') ?? '',
  }

  const { data: result } = useQuery({
    queryKey: ['order', pageIndex, customerName, orderId, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        customerName,
        orderId,
        status: status === 'all' ? null : status,
      }),
  })
  console.log(result)
  const handlePaginate = (pageIndex: number) => {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString())
      return prevState
    })
  }

  return {
    result,
    pageIndex,
    handlePaginate,
  }
}
