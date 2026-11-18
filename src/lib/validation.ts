import { z } from "zod";

export const enquirySchema = z.object({
  productId: z.string().trim().min(1).max(100),
  customerName: z.string().trim().min(2, "Please enter your name.").max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^\+?[\d\s()-]+$/, "Please enter a valid phone number.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Please enter a valid phone number."),
  quantityKg: z
    .number()
    .min(0.1)
    .max(999.99)
    .refine(
      (value) => Math.abs(value * 100 - Math.round(value * 100)) < 0.000001,
      "Use up to two decimal places.",
    )
    .optional(),
  message: z.string().trim().max(2000).default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
