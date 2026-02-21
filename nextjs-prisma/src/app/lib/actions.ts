"use server";

import prisma from "@/app/lib/prisma";
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

  // save to DB
  await prisma.result.create({
    data: {
      num1,
      num2,
      result,
    },
  });

  return {
    result,
    error: null,
    attempts,
  };
}