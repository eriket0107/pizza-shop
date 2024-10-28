import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'

export const useOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['order', pageIndex],
    queryFn: () => getOrders({ pageIndex }),
  })

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
