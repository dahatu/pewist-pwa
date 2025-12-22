import { useCallback, useRef, useState } from "react";

export type Marker = {
  time: number;
  label?: string;
};

type UseAudioSeekProps = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max: number;
  step?: number;
  buffered?: number; // seconds
  markers?: Marker[];
  snapToMarkers?: boolean;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string | undefined,

  onSeekStart?: () => void;
  onSeek?: (value: number) => void;
  onSeekEnd?: (value: number) => void;
};

export function useAudioSeek({
  value,
  defaultValue = 0,
  min = 0,
  max,
  step = 0.01,
  buffered = 0,
  markers = [],
  snapToMarkers = false,
  orientation = "horizontal",
  disabled = false,
  onSeekStart,
  onSeek,
  onSeekEnd,
}: UseAudioSeekProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const snap = (v: number) => {
    if (!snapToMarkers || markers.length === 0) return v;
    return markers.reduce((prev, curr) =>
      Math.abs(curr.time - v) < Math.abs(prev - v) ? curr.time : prev
    , markers[0].time);
  };

  const calcValue = (clientX: number, clientY: number) => {
    if (!trackRef.current) return current;
    const rect = trackRef.current.getBoundingClientRect();
    const percent =
      orientation === "horizontal"
        ? (clientX - rect.left) / rect.width
        : 1 - (clientY - rect.top) / rect.height;

    const raw = min + percent * (max - min);
    const stepped = Math.round(raw / step) * step;
    return clamp(snap(stepped));
  };

  const update = (v: number) => {
    if (!isControlled) setInternal(v);
    onSeek?.(v);
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    trackRef.current?.setPointerCapture(e.pointerId);
    onSeekStart?.();
    update(calcValue(e.clientX, e.clientY));
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (disabled || !(e.buttons & 1)) return;
    update(calcValue(e.clientX, e.clientY));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    const v = calcValue(e.clientX, e.clientY);
    update(v);
    onSeekEnd?.(v);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    const delta =
      e.key === "ArrowRight" || e.key === "ArrowUp"
        ? step * 10
        : e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? -step * 10
        : 0;

    if (delta !== 0) {
      e.preventDefault();
      update(clamp(current + delta));
    }
  };

  return {
    trackRef,
    value: current,
    buffered,
    percent: ((current - min) / (max - min)) * 100,
    bufferedPercent: (buffered / max) * 100,
    markers,
    orientation,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onKeyDown,
    },
  };
}
