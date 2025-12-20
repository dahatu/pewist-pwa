"use client";

import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

export default function Home() {

  const theme = useTheme()

  return (
    <div className="h-[2000px]">
      <Input aria-invalid/>
    </div>
  );
}
