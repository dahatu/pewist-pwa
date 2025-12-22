// useAudioEngine.ts
import { useEffect, useRef, useState } from "react";

export function useAudioEngine(audio: HTMLAudioElement | null) {
  const raf = useRef<number>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    if (!audio) return;

    const update = () => {
      setTime(audio.currentTime);
      setDuration(audio.duration || 0);
      if (audio.buffered.length) {
        setBuffered(audio.buffered.end(audio.buffered.length - 1));
      }
      raf.current = requestAnimationFrame(update);
    };

    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current!);
  }, [audio]);

  return { time, duration, buffered };
}
