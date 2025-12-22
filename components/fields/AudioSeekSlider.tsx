import { useAudioSeek } from "@/hooks/useAudioSeek";
import { cn } from "@/lib/utils";

type Props = Parameters<typeof useAudioSeek>[0];

export function AudioSeekSlider(props: Props) {
  const { trackRef, percent, bufferedPercent, markers, handlers } =
    useAudioSeek(props);

  return (
    <div
      ref={trackRef}
      tabIndex={0}
      {...handlers}
      className={cn(
        "relative w-full h-3 touch-none outline-0 flex items-center",
        props.className
      )}
    >
      {/* Track */}
      <div className="absolute w-full h-[30%] rounded-2xl inset-auto bg-stone-200 dark:bg-stone-800" />

      {/* Buffered */}
      <div
        className="absolute h-[30%] rounded-2xl bg-primary/20"
        style={{
          width: `${bufferedPercent}%`,
        }}
      />

      {/* Filled */}
      <div
        className="absolute h-[30%] bg-primary inset-auto rounded-2xl"
        style={{
          width: `${percent}%`,
        }}
      />

      {/* Thumb */}
      <div
        className="transition-[scale] absolute w-4 h-4 rounded-2xl hover:scale-125 left-[50%] bottom-[50%] border-2 border-primary bg-background -translate-x-[50%] translate-y-[50%]"
        style={{
          left: `${percent}%`,
        }}
      />

      {/* Markers */}
      {markers?.map((m, i) => (
        <div
          key={i}
          title={m.label}
          className="absolute w-1 h-[30%] bottom-[50%] rounded-2xl bg-primary translate-y-[50%] -translate-x-[50%]"
          style={{
            left: `${(m.time / props.max) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
