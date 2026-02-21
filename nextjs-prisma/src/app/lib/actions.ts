"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import type { SumState } from "@/app/lib/types";

export async function calculateSum(
  prevState: SumState,
  formData: FormData
): Promise<SumState> {
  const num1 = Number(formData.get("num1"));
  const num2 = Number(formData.get("num2"));

  const attempts = prevState.attempts + 1;

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return {
      ...prevState,
      attempts,
      error: "Invalid numbers",
    };
  }

  const result = num1 + num2;

  // save to db
  await prisma.result.create({
    data: { num1, num2, result },
  });

  // 
  revalidatePath("/");

  return {
    result,
    error: null,
    attempts,
  };
}

// delete result
export async function deleteResult(formData: FormData) {
  const id = Number(formData.get('id'))
  if(Number.isNaN(id)) return;
  await prisma.result.delete({
    where: {id},
  });

  // refresh the page so resultlsit re-runs
  revalidatePath('/')
}

