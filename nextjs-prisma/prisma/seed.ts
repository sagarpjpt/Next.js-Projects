import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const resultData: Prisma.ResultCreateInput[] = [
  {
    num1: 2,
    num2: 3,
    result: 5,
  },
  {
    num1: 10,
    num2: 20,
    result: 30,
  },
  {
    num1: 7,
    num2: 8,
    result: 15,
  },
];

export async function main() {
  for (const r of resultData) {
    await prisma.result.create({
      data: r,
    });
  }
}

main()
  .then(() => {
    console.log("Result table seeded");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 