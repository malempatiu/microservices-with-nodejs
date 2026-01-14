import { CreateProductDto } from "@/dtos/CartDto";

export interface ICartService {
  createCart(payload: CreateProductDto): Promise<any>;
  getCart(id: number): Promise<any>;
  updateCart(id: number, payload: CreateProductDto): Promise<any>;
  deleteCart(id: number): Promise<boolean>;
}