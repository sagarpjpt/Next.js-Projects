"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleSubmit(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/todos",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input name="email" type="email" placeholder="Email" className="w-full border p-2 mb-3" />
      <input name="password" type="password" placeholder="Password" className="w-full border p-2 mb-3" />
      <button className="w-full bg-black text-white py-2">Login</button>
    </form>
  );
}