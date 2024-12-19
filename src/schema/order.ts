import { z } from "zod";

export const OrderItemSchema = z.object({
  id: z.number(),
  netAmount: z.number(),
  address: z.string(),
});
