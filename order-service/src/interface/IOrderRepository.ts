import { OrderDto, OrderRequestDto } from "@/dtos/OrderDto";

export interface IOrderRepository {
  create(data: OrderRequestDto): Promise<OrderDto>;
  find(limit: number, offset: number): Promise<OrderDto[]>;
  findById(id: number): Promise<OrderDto | null>;
  update(id: number, data: any): Promise<OrderDto>;
  delete(id: number): Promise<void>;
}