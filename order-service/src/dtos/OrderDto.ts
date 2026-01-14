import { z } from "zod";

export const OrderRequestSchema = z.object({
  
});

export type OrderDto = z.infer<typeof OrderRequestSchema>;
