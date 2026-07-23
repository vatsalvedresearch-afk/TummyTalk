import { z } from "zod";

export const ResponseSourceSchema = z.enum(["child", "parent", "proxy"]);

export const ResponseValueSchema = z.union([
  z.boolean(),
  z.number(),
  z.string(),
  z.array(z.string()),
]);

export const ResponseSchema = z.object({
  questionId: z.string(),
  value: ResponseValueSchema,
  source: ResponseSourceSchema,
  answeredAt: z.string().datetime(),
  displayValue: z.string().optional(),
});

export type Response = z.infer<typeof ResponseSchema>;
export type ResponseSource = z.infer<typeof ResponseSourceSchema>;
