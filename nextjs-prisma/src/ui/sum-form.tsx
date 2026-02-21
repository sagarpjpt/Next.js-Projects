"use client";

import { useActionState } from "react";
import { calculateSum } from "@/app/lib/actions";
import type { SumState } from "@/app/lib/types";
import styles from "./sum-form.module.css";

const initialState: SumState = {
  result: null,
  error: null,
  attempts: 0,
};

export default function SumForm() {
  const [state, formAction, isPending] = useActionState<
    SumState,
    FormData
  >(calculateSum, initialState);

  return (
    <>
      <form className={styles.form} action={formAction}>
        <label htmlFor="num1" className={styles.label}>
          Number 1:
        </label>
        <input
          type="number"
          id="num1"
          name="num1"
          className={styles.input}
        />

        <label htmlFor="num2" className={styles.label}>
          Number 2:
        </label>
        <input
          type="number"
          id="num2"
          name="num2"
          className={styles.input}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      <p className={styles.attempts}>
        Attempts: <strong>{state.attempts}</strong>
      </p>

      {state.result !== null && (
        <p className={styles.result}>
          Result from server: <strong>{state.result}</strong>
        </p>
      )}

      {state.error && (
        <p className={styles.error}>{state.error}</p>
      )}
    </>
  );
}