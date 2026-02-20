import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/src/lib/db"
import bcrypt from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!valid) return null

        const { password, ...safeUser } = user
        return safeUser
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },
})