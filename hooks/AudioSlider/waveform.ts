import { createWaveform } from "./useWaveform";

export async function loadWaveform(file: File) {
  return await createWaveform(file, 4000);
}