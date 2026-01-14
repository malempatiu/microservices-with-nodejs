import { z } from "zod";

export const CartRequestSchema = z.object({
  
});

export type CartDto = z.infer<typeof CartRequestSchema>;
