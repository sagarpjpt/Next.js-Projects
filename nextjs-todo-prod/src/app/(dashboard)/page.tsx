import { db } from "@/src/lib/db"
import { TodoList } from "@/src/components/ui/"

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams.page) || 1
  const limit = 10
  const offset = (page - 1) * limit

  const todos = await db.todo.findMany({
    where: { deletedAt: null },
    take: limit,
    skip: offset,
    orderBy: { createdAt: "desc" },
  })

  return <TodoList todos={todos} />
}