import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { OrderFilter, orderFilterSchema } from './orderFilterSchema'

export const useOrderFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params: OrderFilter = {
    customerName: searchParams.get('customerName') ?? '',
    status: searchParams.get('status') ?? '',
    orderId: searchParams.get('orderId') ?? '',
  }

  const { handleSubmit, reset, ...methods } = useForm<OrderFilter>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      customerName: params.customerName,
      status: params.status,
      orderId: params.orderId,
    },
  })

  const handleFilter = ({ customerName, orderId, status }: OrderFilter) => {
    setSearchParams((prevState) => {
      if (customerName) prevState.set('customerName', customerName)
      else prevState.delete('customerName')

      if (status) prevState.set('status', status)
      else prevState.delete('status')

      if (orderId) prevState.set('orderId', orderId)
      else prevState.delete('orderId')

      prevState.set('page', '1')
      return prevState
    })
  }

  const handleClearFilters = () => {
    setSearchParams((prevState) => {
      prevState.delete('customerName')
      prevState.delete('orderId')
      prevState.delete('status')
      prevState.set('page', '1')
      return prevState
    })

    reset({
      customerName: '',
      orderId: '',
      status: 'all',
    })
  }

  return {
    ...methods,
    handleSubmit: handleSubmit(handleFilter),
    handleClearFilters,
  }
}
