import { OrderModel } from "@/models/OrderModel";

export interface IOrderRepository {
  create(data: any): Promise<OrderModel>;
  find(limit: number, offset: number): Promise<OrderModel[]>;
  findById(id: number): Promise<OrderModel | null>;
  update(id: number, data: any): Promise<OrderModel>;
  delete(id: number): Promise<void>;
}