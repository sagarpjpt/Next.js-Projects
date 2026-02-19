"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  if (session.status === "loading") return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to Account</h1>
      <h2 className={styles.subtitle}>Please login to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>LOGIN</button>
        {error && "Something went wrong!"}
      </form>

      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>

      <p className={styles.registerText}>
        New user?{" "}
        <Link href="/dashboard/register" className={styles.registerLink}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
