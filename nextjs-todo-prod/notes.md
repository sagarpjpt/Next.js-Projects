- 1 npm i files and npx init prisma
  npm install prisma @prisma/client
  npm install next-auth@beta
  npm install zod
  npm install bcrypt
  npm install @auth/prisma-adapter
  npx prisma init
- 2 db schema design
  define schema in prisma/schema.prisma
  run migrate npx prisma migrate dev --name init
- 3 prisma setup src/lib/db.ts
- 4 next auth setup 