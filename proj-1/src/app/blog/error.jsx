"use client";

import Button from "@/components/button/Button";
import styles from "./error.module.css";

export default function Error({ reset }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.desc}>
        We couldn’t load this content right now. Please try again.
      </p>

      <div className={styles.actions}>
        <button onClick={reset} className={styles.retry}>
          Try again
        </button>

        <Button text="Go Home" url="/" />
      </div>
    </div>
  );
}
