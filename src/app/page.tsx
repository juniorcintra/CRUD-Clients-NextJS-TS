"use client";

import { useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const { toggleSidebar } = useSidebar();
  return (
    <div>
      <span onClick={toggleSidebar}>Dashboard</span>
    </div>
  );
}
