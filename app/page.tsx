"use client";
import { AudioSeekSlider } from "@/components/fields/AudioSeekSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function Home() {

  const [progress, setProgress] = useState(0)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input />
        <Button>تکایە کلیک بکە</Button>
      </div>
      <div dir="ltr" className="p-10">
        <AudioSeekSlider
            min={0}
            max={100}
            value={progress}
            step={0.1}            
            onSeek={e=> setProgress(e)}
        />
      </div>
      <div className="h-[1000px] "></div>
      <Input />
      <div className="h-[1000px] "></div>
      <Input />
    </div>
  );
}
