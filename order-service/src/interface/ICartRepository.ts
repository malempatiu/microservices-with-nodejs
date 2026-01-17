import { CartItem } from "@/db/schema";
import { CartCreateDto, CartDto } from "@/dtos/CartDto";


export interface ICartRepository {
  create(cartItem: CartCreateDto): Promise<CartDto>;
  findById(id: number): Promise<CartDto>;
  findByCustomerId(id: number): Promise<CartDto>;
  delete(id: number): Promise<void>;
  findItem(id: number): Promise<CartItem>;
  updateItem(id: number, data: CartCreateDto): Promise<void>;
  deleteItem(id: number): Promise<void>;
}