import { CartItem } from "@/db/schema/cart";
import { z } from "zod";

export const CartRequestSchema = z.object({
  customerId: z.int("Customer Id is required").min(1),
  productId: z.int("Customer Id is required").min(1),
  quantity: z.int("Customer Id is required").min(1),
});

export type CartCreateRequestDto = z.infer<typeof CartRequestSchema>;

export type CartCreateDto = {
  price: number;
  name: string;
} & CartCreateRequestDto;

export type CartDto = {
  id: number,
  cartItem: CartItem[];
}