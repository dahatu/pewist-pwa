import { useEffect, useRef, useState } from "react";

type WaveformProps = {
  data: Float32Array;
  width?: number;
  height?: number;
  progress: number; // 0 → 1
  onSeek?: (progress: number) => void;
};

export function Waveform({
  data,
  width = 600,
  height = 100,
  progress,
  onSeek,
}: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    const barWidth = width / data.length;

    data.forEach((value, i) => {
      const x = i * barWidth;
      const barHeight = value * height;
      ctx.fillStyle = i / data.length < progress ? "#22c55e" : "#94a3b8";
      ctx.fillRect(x, (height - barHeight) / 2, barWidth * 0.8, barHeight);
    });
  }, [data, progress, width, height]);

  // Helper to calculate progress from mouse/touch
  const calculateProgress = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const rect = canvas.getBoundingClientRect();
    let p = (clientX - rect.left) / rect.width;
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    return p;
  };

  // Handle seek from mouse/touch
  const handleSeek = (clientX: number) => {
    const newProgress = calculateProgress(clientX);
    onSeek?.(newProgress);
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging) handleSeek(e.clientX);
  };

  const onMouseUp = () => setIsDragging(false);

  // Touch events
  const onTouchMove = (e: TouchEvent) => {
    handleSeek(e.touches[0].clientX);
  };

  const onTouchEnd = () => setIsDragging(false);

  // Add global listeners
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleSeek(e.touches[0].clientX);
      }}
      style={{ touchAction: "none", cursor: "pointer" }}
    />
  );
}
