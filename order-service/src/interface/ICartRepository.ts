import { CartCreateDto, CartDto } from "@/dtos/CartDto";


export interface ICartRepository {
  create(cartItem: CartCreateDto): Promise<CartDto>;
  find(limit: number, offset: number): Promise<CartDto[]>;
  findById(id: number): Promise<CartDto | null>;
  update(id: number, data: CartCreateDto): Promise<CartDto>;
  delete(id: number): Promise<void>;
}