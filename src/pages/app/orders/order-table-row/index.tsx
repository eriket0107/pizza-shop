import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/formatCurrency'

import { OrderDetails } from '../order-details'
import { useOrderTableRow } from './useOrderTableRow'

type OrderTableRowProps = {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const {
    cancelOrderFn,
    isCancelling,
    approveOrderFn,
    isApproving,
    dispatchOrderFn,
    isDispatching,
    deliverOrderFn,
    isDelivering,
  } = useOrderTableRow()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} isOpen={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {formatCurrency(order.total)}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant={'outline'}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApproving}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant={'outline'}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatching}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant={'outline'}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDelivering}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        {
          <Button
            variant={'ghost'}
            disabled={
              !['pending', 'processing'].includes(order.status) || isCancelling
            }
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
          >
            <X className="mr-2 h-3 w-3" />
            {isCancelling ? 'Cancelando...' : 'Cancelar'}
          </Button>
        }
      </TableCell>
    </TableRow>
  )
}
