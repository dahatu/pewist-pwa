import { useEffect, useState } from "react";

type UseWaveformOptions = {
  samples?: number;
};

export function useWaveform(
  file: File | null,
  options: UseWaveformOptions = {}
) {
  const { samples = 200 } = options;

  const [data, setData] = useState<Float32Array | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    let cancelled = false;
    const audioCtx = new AudioContext();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const arrayBuffer = await file!.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        const channelData = audioBuffer.getChannelData(0);
        const blockSize = Math.floor(channelData.length / samples);
        const waveform = new Float32Array(samples);

        for (let i = 0; i < samples; i++) {
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(channelData[i * blockSize + j]);
          }
          waveform[i] = sum / blockSize;
        }

        if (!cancelled) {
          setData(waveform);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to decode audio file");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      audioCtx.close();
    };
  }, [file, samples]);

  return { data, loading, error };
}
