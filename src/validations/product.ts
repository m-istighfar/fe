import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().int().min(1, "Price must be at least 1"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

export type ProductPayload = z.infer<typeof productSchema>;
