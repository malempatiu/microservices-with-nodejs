import { CartCreateRequestDto, CartDto } from "@/dtos/CartDto";

export interface ICartService {
  createCart(dto: CartCreateRequestDto): Promise<CartDto>;
  getCart(id: number): Promise<CartDto>;
  deleteCart(id: number): Promise<boolean>;
  updateCartItem(cartId:number, itemId: number, dto: CartCreateRequestDto): Promise<any>;
  deleteCartItem(id: number): Promise<boolean>;
}