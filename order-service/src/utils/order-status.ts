const ORDER_STATUS = {
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
  shipped: 'Shipped'
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];