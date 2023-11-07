"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button className="btn btn-primary w-full" onClick={() => signIn()}>
      Zaloguj się
    </button>
  );
}
