import { CartDto } from "@/dtos/CartDto";

export interface ICartService {
  createCart(payload: CartDto): Promise<any>;
  getCart(id: number): Promise<any>;
  updateCart(id: number, payload: CartDto): Promise<any>;
  deleteCart(id: number): Promise<boolean>;
}