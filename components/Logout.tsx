"use client";

import { signIn, signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button className="btn btn-primary" onClick={() => signOut()}>
      Wyloguj się
    </button>
  );
}
