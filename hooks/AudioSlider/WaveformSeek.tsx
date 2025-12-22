// WaveformSeek.tsx
import * as Slider from "@radix-ui/react-slider";

type Props = {
  value: number;
  max: number;
  waveform: number[];
  onSeek: (v: number) => void;
};

export function WaveformSeek({ value, max, waveform, onSeek }: Props) {
  return (
    <Slider.Root
      value={[value]}
      max={max}
      dir="ltr"
      step={0.01}
      onValueChange={([v]) => onSeek(v)}
      className="relative flex h-14 items-center"
    >
      <Slider.Track className="relative h-10 w-full overflow-hidden rounded-md bg-neutral-200">
        <div className="absolute inset-0 flex items-end gap-[1px] px-1">
          {waveform.map((amp, i) => (
            <div
              key={i}
              className="w-[2px] bg-neutral-500"
              style={{ height: `${amp * 100}%` }}
            />
          ))}
        </div>
      </Slider.Track>

      <Slider.Thumb className="block h-4 w-4 rounded-full bg-indigo-500 shadow" />
    </Slider.Root>
  );
}
