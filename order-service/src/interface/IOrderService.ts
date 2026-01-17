import { OrderDto } from "@/dtos/OrderDto";

export interface IOrderService {
  createOrder(customerId: number): Promise<OrderDto>;
  getOrder(id: number): Promise<OrderDto>;
  updateOrder(id: number, payload: any): Promise<OrderDto>;
  deleteOrder(id: number): Promise<boolean>;
}