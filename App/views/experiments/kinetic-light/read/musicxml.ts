// Libraries
import { strFromU8, unzipSync } from 'fflate';

// Piece
import { toPiece, type Note, type Piece } from './piece';

const STEPS: Record<string, number> = {
  A: 9,
  B: 11,
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
};
const CONTAINER = 'META-INF/container.xml';
const MAX_UNZIPPED_BYTES = 20 * 1024 * 1024;
const PERCUSSION_CHANNEL = 10;
const DEFAULT_TEMPO = 90;
const DEFAULT_BEATS_PER_BAR = 4;
const DEFAULT_VELOCITY = 0.75;
const FORTE_VELOCITY = 90 / 127;

const child = (parent: Element | null | undefined, selector: string) =>
  parent?.querySelector(`:scope > ${selector}`) ?? null;

const text = (parent: Element | null | undefined, selector: string) =>
  child(parent, selector)?.textContent?.trim() ?? null;

const isStop = (element: Element) => element.getAttribute('type') === 'stop';

const tempoOf = (element: Element): number | null => {
  const sound = element.tagName === 'sound' ? element : child(element, 'sound');
  const marked = Number(
    element.querySelector('metronome > per-minute')?.textContent
  );
  const tempo = Number(sound?.getAttribute('tempo')) || marked;

  return tempo > 0 ? tempo : null;
};

const spanOf = (
  measure: Element,
  divisions: number,
  bar: number | null
): number => {
  let unit = divisions;
  let length = bar;
  let offset = 0;
  let end = 0;
  let last = 0;

  for (const element of measure.children) {
    const tag = element.tagName;

    if (tag === 'attributes') {
      unit = Number(text(element, 'divisions')) || unit;

      const time = child(element, 'time');
      const beats = Number(text(time, 'beats'));
      const beatType = Number(text(time, 'beat-type'));

      if (beats > 0 && beatType > 0) {
        length = (beats * 4) / beatType;
      }
    }

    const duration = Number(text(element, 'duration') ?? 0) / unit;

    if (tag === 'backup') {
      offset -= duration;
    }

    if (
      tag === 'note' &&
      !child(element, 'grace') &&
      !child(element, 'chord')
    ) {
      last = Math.max(last, offset);
    }

    if (
      tag === 'forward' ||
      (tag === 'note' && !child(element, 'grace') && !child(element, 'chord'))
    ) {
      offset += duration;
    }

    end = Math.max(end, offset);
  }

  if (length === null) {
    return end;
  }

  return last >= length ? Math.max(length, end) : length;
};

const unzipMusicXml = (bytes: Uint8Array): string | null => {
  const container = unzipSync(bytes, {
    filter: (file) => file.name === CONTAINER,
  })[CONTAINER];
  const root = container
    ? strFromU8(container).match(/full-path="([^"]+)"/)?.[1]
    : undefined;

  if (!root) {
    return null;
  }

  const file = unzipSync(bytes, {
    filter: (entry) =>
      entry.name === root && entry.originalSize <= MAX_UNZIPPED_BYTES,
  })[root];

  return file ? strFromU8(file) : null;
};

const readMusicXml = (
  xml: string,
  title: string,
  tempo?: number | null
): (Piece & { bars: number[]; quarters: number[] }) | null => {
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  const score = document.querySelector('score-partwise');

  if (!score || document.querySelector('parsererror')) {
    return null;
  }

  const percussion = new Set(
    [...score.querySelectorAll(':scope > part-list > score-part')]
      .filter(
        (scorePart) =>
          Number(text(child(scorePart, 'midi-instrument'), 'midi-channel')) ===
          PERCUSSION_CHANNEL
      )
      .map((scorePart) => scorePart.getAttribute('id'))
  );

  const notes: Note[] = [];
  const bars: number[] = [];
  let marked: number | null = null;
  let beatsPerBar: number | null = null;

  score.querySelectorAll(':scope > part').forEach((part) => {
    if (percussion.has(part.getAttribute('id'))) {
      return;
    }

    const played: Note[] = [];
    const counting = bars.length === 0;
    let divisions = 1;
    let measureStart = 0;
    let barLength: number | null = null;

    part.querySelectorAll(':scope > measure').forEach((measure, index) => {
      const span = spanOf(measure, divisions, barLength);
      let offset = 0;
      let length = 0;
      let chordStart = 0;

      for (const element of measure.children) {
        const tag = element.tagName;
        const duration = Number(text(element, 'duration') ?? 0) / divisions;

        if (tag === 'attributes') {
          divisions = Number(text(element, 'divisions')) || divisions;

          const time = child(element, 'time');
          const beats = Number(text(time, 'beats'));
          const beatType = Number(text(time, 'beat-type'));

          if (beats > 0 && beatType > 0) {
            barLength = (beats * 4) / beatType;
            beatsPerBar ??= Math.max(1, Math.round(barLength));
          }
        }

        if (tag === 'direction' || tag === 'sound') {
          marked ??= tempoOf(element);
        }

        if (tag === 'backup') {
          offset -= duration;
        }

        if (tag === 'forward') {
          offset += duration;
        }

        if (tag === 'note' && !child(element, 'grace')) {
          const isChord = Boolean(child(element, 'chord'));
          const start = measureStart + (isChord ? chordStart : offset);

          if (!isChord) {
            chordStart = offset;
            offset += duration;
          }

          const pitch = child(element, 'pitch');
          const step = STEPS[text(pitch, 'step') ?? ''];

          if (step !== undefined) {
            const midi =
              (Number(text(pitch, 'octave')) + 1) * 12 +
              step +
              Number(text(pitch, 'alter') ?? 0);
            const held = Math.min(duration, measureStart + span - start);
            const notations = child(element, 'notations');
            const tied = [
              ...element.querySelectorAll(':scope > tie'),
              ...(notations?.querySelectorAll(':scope > tied, :scope > slur') ??
                []),
            ].some(isStop)
              ? played.find(
                  (note) =>
                    note.pitch === midi &&
                    Math.abs(note.time + note.duration - start) < 0.01
                )
              : undefined;
            const dynamics = Number(element.getAttribute('dynamics'));

            if (tied) {
              tied.duration += held;
            } else if (held > 0) {
              played.push({
                duration: held,
                pitch: midi,
                time: start,
                velocity:
                  dynamics > 0
                    ? Math.min(1, (dynamics / 100) * FORTE_VELOCITY)
                    : DEFAULT_VELOCITY,
              });
            }
          }
        }

        length = Math.max(length, offset);
      }

      const pickup = index === 0 && barLength !== null && length < barLength;

      if (counting) {
        bars.push(measureStart);
      }

      measureStart += pickup ? length : span;
    });

    if (counting) {
      bars.push(measureStart);
    }

    notes.push(...played);
  });

  const beatsPerMinute = tempo ?? marked ?? DEFAULT_TEMPO;
  const secondsPerBeat = 60 / beatsPerMinute;

  return toPiece({
    bars: bars.map((bar) => bar * secondsPerBeat),
    quarters: bars,
    beatsPerBar: beatsPerBar ?? DEFAULT_BEATS_PER_BAR,
    notes: notes.map((note) => ({
      ...note,
      duration: note.duration * secondsPerBeat,
      time: note.time * secondsPerBeat,
    })),
    source: 'notes',
    tempo: Math.round(beatsPerMinute),
    title:
      text(child(score, 'work'), 'work-title') ||
      text(score, 'movement-title') ||
      title,
  });
};

export { readMusicXml, unzipMusicXml };
