import { api } from '@/lib/axios'

export interface DispatchOrderParams {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderParams) {
  // Patch pois não está havendo deleção, apenas alteração no status do pedido
  await api.patch(`/orders/${orderId}/dispatch`)
}
