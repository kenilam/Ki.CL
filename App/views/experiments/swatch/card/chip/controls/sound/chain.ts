// Helpers
import type { Tone as Settings } from './scale';

type Tone = typeof import('tone');

const SILENT = -60;

const chainOf = (Tone: Tone, { brightness, movement }: Settings) => {
  const output = new Tone.Volume(SILENT).toDestination();
  const reverb = new Tone.Reverb({ decay: 10, wet: 0.5 }).connect(output);
  const delay = new Tone.FeedbackDelay({
    delayTime: 0.6,
    feedback: 0.35,
    wet: 0.2,
  }).connect(reverb);
  const filter = new Tone.Filter({
    frequency: 400 + brightness * 4000,
    Q: 0.5,
    type: 'lowpass',
  }).connect(delay);
  const sweep = new Tone.LFO({
    frequency: 0.02 + movement * 0.1,
    max: 600 + brightness * 5000,
    min: 200 + brightness * 1200,
  }).connect(filter.frequency);

  return {
    delay,
    filter,
    nodes: [sweep, filter, delay, reverb, output],
    output,
    sweep,
  };
};

export { SILENT, chainOf };
