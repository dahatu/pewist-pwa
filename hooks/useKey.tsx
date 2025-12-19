import { useEffect, useRef } from "react";

type EventType = "keydown" | "keyup";

interface UseKeyOptions {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;        // macOS Cmd
  cmdOrCtrl?: boolean;   // Cross-platform
  enabled?: boolean;
  preventDefault?: boolean;
  eventType?: EventType; // default: "keydown"
}

export function useKey(
  key: string | undefined,
  callback: (event: KeyboardEvent) => void,
  options: UseKeyOptions = {}
) {
  const {
    ctrl = false,
    shift = false,
    alt = false,
    meta = false,
    cmdOrCtrl = false,
    enabled = true,
    preventDefault = false,
    eventType = "keydown",
  } = options;

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      if (!key) return;

      // Normalize key for Shift: allow uppercase when shift is pressed
      let expectedKeys = [key];
      if (shift) {
        const upperKey = key.length === 1 ? key.toUpperCase() : key;
        expectedKeys.push(upperKey);
      }

      if (!expectedKeys.includes(event.key)) return;

      if (ctrl && !event.ctrlKey) return;
      if (shift && !event.shiftKey) return;
      if (alt && !event.altKey) return;
      if (meta && !event.metaKey) return;
      if (cmdOrCtrl && !(event.metaKey || event.ctrlKey)) return;

      if (preventDefault) event.preventDefault();

      callbackRef.current(event);
    };

    window.addEventListener(eventType, handler);
    return () => window.removeEventListener(eventType, handler);
  }, [
    key,
    ctrl,
    shift,
    alt,
    meta,
    cmdOrCtrl,
    enabled,
    preventDefault,
    eventType,
  ]);
}
