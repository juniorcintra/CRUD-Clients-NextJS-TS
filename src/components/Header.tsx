"use client";

import LogoIMG from "@/assets/logo.png";
import { PanelLeft } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "./ui/sidebar";
import Link from "next/link";

export default function Header() {
  const { isMobile, toggleSidebar } = useSidebar();
  return isMobile ? (
    <div className="flex h-12 w-full items-center justify-between px-4">
      <PanelLeft onClick={toggleSidebar} className="cursor-pointer" />
      <Link href="/">
        <Image src={LogoIMG} alt="Logo" width={30} height={30} />
      </Link>
    </div>
  ) : null;
}
