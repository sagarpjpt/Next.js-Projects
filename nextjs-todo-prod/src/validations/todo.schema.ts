import { z } from "zod"

export const createTodoSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
})

export type CreateTodoInput = z.infer<typeof createTodoSchema>