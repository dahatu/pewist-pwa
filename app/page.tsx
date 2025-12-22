"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWaveform } from "@/hooks/Waveform/useWaveform";
import { Waveform } from "@/hooks/Waveform/Waveform";
import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = React.useState(0);
  const { data, loading, error } = useWaveform(file, {
    samples: 300,
  });

  const player = useRef(
    new Howl({
      src: "https://dls.musics-fa.com/song/alibz/2025/12/Ahoora%20-%20Anar%20Anar%20Musics-Fa.mp3",
    })
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input />
        <Button>تکایە کلیک بکە</Button>
      </div>
      <div dir="ltr">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {data && (
          <Button
            onClick={() => {
              if (player.current?.playing()) {
                player.current?.pause();
              } else {
                player.current?.play();
              }
            }}
          >
            Play/Pause
          </Button>
        )}
        {data && (
          <Waveform
            data={data}
            width={800}
            height={120}
            progress={progress}
            onSeek={(p) => {
              setProgress(p);
              player.current.seek(p * 100);
            }}
          />
        )}
      </div>
      <div className="h-[1000px] "></div>
      <Input />
      <div className="h-[1000px] "></div>
      <Input />
    </div>
  );
}
