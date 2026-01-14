import { z } from "zod";

export const CreateProductRequestSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required"),

  description: z
    .string()
    .min(10, "Description is required"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),

  price: z
    .number()
    .min(1, "Price must be greater than or equal to 1"),
});

export type CreateProductDto = z.infer<typeof CreateProductRequestSchema>;
