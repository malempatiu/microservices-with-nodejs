import { z } from "zod";

export const CartRequestSchema = z.object({
  customerId: z.int("Customer Id is required").min(1),
  productId: z.int("Customer Id is required").min(1),
  quantity: z.int("Customer Id is required").min(1),
});

export type CartCreateDto = z.infer<typeof CartRequestSchema>;
