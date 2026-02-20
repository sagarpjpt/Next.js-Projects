"use server"

import { db } from "@/src/lib/db"
import { auth } from "@/src/lib/auth"
import { createTodoSchema } from "@/src/validations/todo.schema"
import { revalidatePath } from "next/cache"

export async function createTodo(formData: FormData) {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const parsed = createTodoSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  })

  if (!parsed.success) {
    return { error: "Invalid input" }
  }

  await db.todo.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
}

export async function deleteTodo(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await db.todo.update({
    where: { id },
    data: { deletedAt: new Date() },
  })

  revalidatePath("/dashboard")
}