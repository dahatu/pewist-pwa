// useSeekCore.ts
export type Marker = { time: number; label?: string };

export function snapToMarkers(time: number, markers: Marker[], threshold = 0.25) {
  for (const m of markers) {
    if (Math.abs(m.time - time) <= threshold) return m.time;
  }
  return time;
}
