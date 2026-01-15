import { CartCreateRequestDto, CartDto } from "@/dtos/CartDto";

export interface ICartService {
  createCart(dto: CartCreateRequestDto): Promise<CartDto>;
  getCart(id: number): Promise<CartDto>;
  updateCart(id: number, dto: CartCreateRequestDto): Promise<any>;
  deleteCart(id: number): Promise<boolean>;
}