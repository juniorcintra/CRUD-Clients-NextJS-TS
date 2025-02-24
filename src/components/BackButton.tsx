"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type BackButtonProps = ComponentProps<"button">;

export default function BackButtonComponent(props: BackButtonProps) {
  const { back } = useRouter();

  return (
    <button
      className="cursor-pointer rounded-full border-[2px] border-[#107E0B] bg-transparent text-[#107E0B] opacity-80 transition-colors duration-300 hover:opacity-100"
      onClick={() => back()}
      {...props}
    />
  );
}
