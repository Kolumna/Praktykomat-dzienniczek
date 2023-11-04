"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button className="btn btn-primary" onClick={() => signIn()}>
      Zaloguj się
    </button>
  );
}
