"use client";

import BackButtonComponent from "@/components/BackButton";
import { ChevronLeft } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-start gap-8">
      <div>
        <BackButtonComponent>
          <ChevronLeft />
        </BackButtonComponent>

        <h1 className="text-[32px] font-bold text-black">Clientes</h1>
      </div>
    </div>
  );
}
