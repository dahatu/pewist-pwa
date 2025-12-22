// PlayerTimeline.tsx
import { useRef } from "react";
import { useAudioEngine } from "./useAudioEngine";
import { WaveformSeek } from "./WaveformSeek";

export function PlayerTimeline({ src, waveform }: any) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { time, duration } = useAudioEngine(audioRef.current);

  return (
    <div className="w-full space-y-2" dir="ltr">
      <audio ref={audioRef} src={src} preload="auto" />

      <WaveformSeek
        value={time}
        max={duration}
        waveform={waveform}
        onSeek={(t) => {
          if (audioRef.current) audioRef.current.currentTime = t;
        }}
      />

      <div className="flex justify-between text-xs text-neutral-400">
        <span>{time.toFixed(1)}</span>
        <span>{duration.toFixed(1)}</span>
      </div>
    </div>
  );
}
