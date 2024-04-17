import { api } from '@/lib/axios'

export interface DeliverOrderParams {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParams) {
  // Patch pois não está havendo deleção, apenas alteração no status do pedido
  await api.patch(`/orders/${orderId}/deliver`)
}
