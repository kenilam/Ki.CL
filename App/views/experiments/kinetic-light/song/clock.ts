// Libraries
import * as Tone from 'tone';

const LEAD_SECONDS = 2;

const latency = (): number => {
  const context = Tone.getContext().rawContext;

  return 'outputLatency' in context ? context.outputLatency || 0 : 0;
};

const clock = (): number => {
  const transport = Tone.getTransport();

  if (transport.state !== 'started') {
    return transport.seconds - LEAD_SECONDS;
  }

  return (
    transport.getSecondsAtTime(Tone.immediate() - latency()) - LEAD_SECONDS
  );
};

export { clock, LEAD_SECONDS };
