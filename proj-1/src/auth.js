"use server";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/db";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with the email");
          }
          if (user.password !== credentials.password) {
            throw new Error("Incorrect password");
          }
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
});
