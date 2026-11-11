// Stage
import {
  playheadAt,
  type Playhead,
} from '@/views/experiments/kinetic-light/stage/playhead';

const FOLLOW_SECONDS = 0.75;
const FOLLOW_SAMPLES = 7;

const follow = (playhead: Playhead, time: number): number => {
  let sum = 0;

  for (let sample = 0; sample < FOLLOW_SAMPLES; sample += 1) {
    sum += playheadAt(
      playhead,
      time + FOLLOW_SECONDS * ((sample / (FOLLOW_SAMPLES - 1)) * 2 - 1)
    );
  }

  return sum / FOLLOW_SAMPLES;
};

export { follow };
