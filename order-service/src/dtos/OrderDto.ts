import { OrderStatus } from "@/utils/order-status";

export type OrderDetailRequestDto = {
  productId: number;
  quantity: number;
  price: number;
  orderId?: number;
  name: string;
};

type OrderRequest = {
  customerId: number;
  amount: number;
  status: OrderStatus;
}

export type OrderRequestDto = {
  orderDetails: OrderDetailRequestDto[]
} & OrderRequest;

export type OrderDto = Omit<OrderRequest, 'status'> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}