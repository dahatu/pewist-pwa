// useWaveform.ts
export async function createWaveform(
  file: File,
  samples = 200
): Promise<number[]> {
  const ctx = new AudioContext();
  const buffer = await ctx.decodeAudioData(await file.arrayBuffer());
  const data = buffer.getChannelData(0);

  const block = Math.floor(data.length / samples);
  const waveform: number[] = [];

  for (let i = 0; i < samples; i++) {
    let sum = 0;
    for (let j = 0; j < block; j++) {
      sum += Math.abs(data[i * block + j]);
    }
    waveform.push(sum / block);
  }

  return waveform;
}
