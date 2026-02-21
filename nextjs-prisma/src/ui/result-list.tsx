import { deleteResult } from "@/app/lib/actions";
import prisma from "@/app/lib/prisma";

const PAGE_SIZE = 5;

import { PaginationProps } from "@/app/lib/types";
import Link from "next/link";

export default async function ResultList({ page }: PaginationProps) {
  const results = await prisma.result.findMany({
    orderBy: { id: "desc" },
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  const totalCount = await prisma.result.count();
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="w-full space-y-3">
      <h2 className="text-lg font-semibold">Stored Results</h2>

      {results.map((r) => (
        <div
          key={r.id}
          className="flex items-center justify-between rounded border p-3 text-black text-sm bg-zinc-50"
        >
          <div>
            {r.num1} + {r.num2} = <strong>{r.result}</strong>
          </div>

          {/* delete button */}
          <form action={deleteResult}>
            <input type="hidden" name="id" value={r.id} />
            <button className="cursor-pointer text-red-600 text-sm hover:underline" type="submit">
                Delete
            </button>
          </form>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex gap-2 pt-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/?page=${i + 1}`}
            className={`px-2 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}