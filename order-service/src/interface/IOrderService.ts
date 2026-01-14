import { OrderModel } from "@/models/OrderModel";

export interface IOrderService {
  createOrder(payload: any): Promise<OrderModel>;
  getOrder(id: number): Promise<OrderModel>;
  updateOrder(id: number, payload: any): Promise<OrderModel>;
  deleteOrder(id: number): Promise<boolean>;
}