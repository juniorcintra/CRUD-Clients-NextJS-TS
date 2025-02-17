"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  const handleSign = async () => {
    await signIn("google");
  };

  return <button onClick={handleSign}>Login</button>;
}
