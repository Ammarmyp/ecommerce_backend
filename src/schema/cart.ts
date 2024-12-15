import { z } from "zod";

export const CartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});
