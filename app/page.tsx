"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

export default function Home() {
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input />
        <Button>تکایە کلیک بکە</Button>
      </div>
      <div className="h-[1000px] "></div>
      <Input />
      <div className="h-[1000px] "></div>
      <Input />
    </div>
  );
}
