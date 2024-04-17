import { api } from '@/lib/axios'

export interface CancelOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  // Patch pois não está havendo deleção, apenas alteração no status do pedido
  await api.patch(`/orders/${orderId}/cancel`)
}
