"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const handleSign = async () => {
    await signIn("google");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const { data } = useSession();
  console.log("🚀 ~ data:", data);

  return (
    <div>
      <button onClick={handleSign}>Login</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}
