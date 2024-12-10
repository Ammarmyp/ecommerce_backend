import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  tags: z
    .union([z.string(), z.array(z.string())])
    .transform((tags) => (typeof tags === "string" ? [tags] : tags)),
});

export const AddressSchema = z.object({
  lineOne: z.string().nullable(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  userId: z.number(),
});
