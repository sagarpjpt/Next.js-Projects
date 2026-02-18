"use client";
import { signIn } from "@/auth";
import styles from "./page.module.css";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  return (
    <div className="container1">
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
        <button className={styles.button}>Register</button>
        {error && "Something went wrong!"}
      </form>
    </div>
  );
}
