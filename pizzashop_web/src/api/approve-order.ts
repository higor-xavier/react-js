import { api } from '@/lib/axios'

export interface ApproveOrderParams {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
  // Patch pois não está havendo deleção, apenas alteração no status do pedido
  await api.patch(`/orders/${orderId}/approve`)
}
