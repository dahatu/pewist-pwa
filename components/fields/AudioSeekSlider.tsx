import { useAudioSeek } from "@/hooks/useAudioSeek";
import { cn } from "@/lib/utils";

type Props = Parameters<typeof useAudioSeek>[0];

export function AudioSeekSlider(props: Props) {
  const {
    trackRef,
    percent,
    bufferedPercent,
    markers,
    orientation,
    handlers,
  } = useAudioSeek(props);

  const isVertical = orientation === "vertical";

  return (
    <div
      ref={trackRef}
      tabIndex={0}
      {...handlers}
      style={{
        position: "relative",
        width: isVertical ? 6 : "50%",
        height: isVertical ? "100%" : 3,
        touchAction: "none",
        outline: 'none'
      }}
      className={props.className}
    >
      {/* Track */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#ddd",
          // borderRadius: 999,
        }}
      />

      {/* Buffered */}
      <div
        style={{
          position: "absolute",
          inset: isVertical
            ? `auto 0 0 0`
            : `0 auto 0 0`,
          width: isVertical ? "100%" : `${bufferedPercent}%`,
          height: isVertical ? `${bufferedPercent}%` : "100%",
          background: "#bbb",
          // borderRadius: 999
        }}
      />

      {/* Filled */}
      <div
        style={{
          position: "absolute",
          inset: isVertical
            ? `auto 0 0 0`
            : `0 auto 0 0`,
          width: isVertical ? "100%" : `${percent}%`,
          height: isVertical ? `${percent}%` : "100%",
          background: "var(--primary)",
          // borderRadius: 999
        }}
      />

      {/* Thumb */}
      <div
        style={{
          position: "absolute",
          left: isVertical ? "50%" : `${percent}%`,
          bottom: isVertical ? `${percent}%` : "50%",
          transform: "translate(-50%, 50%)",
          width: 12,
          height: 12,
          borderRadius: "50%",
          border: "2px solid var(--primary)",
          background: " var(--background)",
        }}
      />

      {/* Markers */}
      {markers?.map((m, i) => (
        <div
          key={i}
          title={m.label}
          style={{
            position: "absolute",
            left: isVertical ? "50%" : `${(m.time / props.max) * 100}%`,
            bottom: isVertical ? `${(m.time / props.max) * 100}%` : "50%",
            width: 3,
            height: 5,
            // borderRadius: "50%",
            background: "#000",
            transform: "translate(-50%, 50%)",
          }}
        />
      ))}
    </div>
  );
}
