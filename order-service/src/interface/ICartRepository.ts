import { CartDto } from "@/dtos/CartDto";
import { CartModel } from "@/models/CartModel";

export interface ICartRepository {
  create(data: CartDto): Promise<CartModel>;
  find(limit: number, offset: number): Promise<CartModel[]>;
  findById(id: number): Promise<CartModel | null>;
  update(id: number, data: any): Promise<CartModel>;
  delete(id: number): Promise<void>;
}