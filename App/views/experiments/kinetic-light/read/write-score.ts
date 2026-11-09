type Written = { length: number; pitch: number; start: number };

type Staff = { clef: 'F' | 'G'; notes: readonly Written[] };

type Part = {
  name: string;
  staves: readonly Staff[];
  words?: readonly { start: number; text: string }[];
};

type Meter = { beatType: number; beats: number };

type Chord = { length: number; pitches: number[]; start: number };

const DIVISIONS = 4;
const VOICES_PER_STAFF = 4;
const VALUES: readonly [number, string, boolean][] = [
  [24, 'whole', true],
  [16, 'whole', false],
  [12, 'half', true],
  [8, 'half', false],
  [6, 'quarter', true],
  [4, 'quarter', false],
  [3, 'eighth', true],
  [2, 'eighth', false],
  [1, '16th', false],
];
const STEPS = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];
const SHARPS = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
const CLEF_LINES = { F: 4, G: 2 };

const escape = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const toDivisions = (quarters: number): number =>
  Math.round(quarters * DIVISIONS);

const toVoices = (notes: readonly Written[]): Chord[][] => {
  const chords = new Map<string, Chord>();

  notes.forEach(({ length, pitch, start }) => {
    const from = toDivisions(start);
    const span = Math.max(1, toDivisions(start + length) - from);
    const key = `${from}:${span}`;
    const chord = chords.get(key);

    if (chord) {
      chord.pitches.push(pitch);
    } else {
      chords.set(key, { length: span, pitches: [pitch], start: from });
    }
  });

  const voices: Chord[][] = [];

  [...chords.values()]
    .sort((a, b) => a.start - b.start || b.length - a.length)
    .forEach((chord) => {
      const free = voices.find((voice) => {
        const last = voice[voice.length - 1];

        return last.start + last.length <= chord.start;
      });

      if (free) {
        free.push(chord);
        return;
      }

      if (voices.length < VOICES_PER_STAFF) {
        voices.push([chord]);
        return;
      }

      const voice = voices.reduce((earliest, next) =>
        next[next.length - 1].start + next[next.length - 1].length <
        earliest[earliest.length - 1].start +
          earliest[earliest.length - 1].length
          ? next
          : earliest
      );
      const last = voice[voice.length - 1];

      if (last.start === chord.start) {
        last.pitches.push(...chord.pitches);
        last.length = Math.min(last.length, chord.length);
        return;
      }

      last.length = chord.start - last.start;
      voice.push(chord);
    });

  return voices;
};

const toValues = (length: number): (typeof VALUES)[number][] => {
  const values: (typeof VALUES)[number][] = [];
  let left = length;

  while (left > 0) {
    const value = VALUES.find(([size]) => size <= left) ?? VALUES[0];

    values.push(value);
    left -= value[0];
  }

  return values;
};

const writePitch = (pitch: number): string => {
  const step = STEPS[pitch % 12];
  const alter = SHARPS[pitch % 12] ? '<alter>1</alter>' : '';

  return `<pitch><step>${step}</step>${alter}<octave>${Math.floor(pitch / 12) - 1}</octave></pitch>`;
};

const writeRest = (
  length: number,
  voice: number,
  staff: number,
  visible: boolean,
  whole: boolean
): string => {
  if (!visible) {
    return `<forward><duration>${length}</duration><voice>${voice}</voice><staff>${staff}</staff></forward>`;
  }

  if (whole) {
    return `<note><rest measure="yes"/><duration>${length}</duration><voice>${voice}</voice><staff>${staff}</staff></note>`;
  }

  return toValues(length)
    .map(
      ([size, type, dotted]) =>
        `<note><rest/><duration>${size}</duration><voice>${voice}</voice><type>${type}</type>${dotted ? '<dot/>' : ''}<staff>${staff}</staff></note>`
    )
    .join('');
};

const writeChord = (
  pitches: readonly number[],
  length: number,
  voice: number,
  staff: number,
  tiedBefore: boolean,
  tiedAfter: boolean
): string => {
  const values = toValues(length);

  return values
    .map(([size, type, dotted], index) => {
      const stop = tiedBefore || index > 0;
      const start = tiedAfter || index < values.length - 1;
      const ties = `${stop ? '<tie type="stop"/>' : ''}${start ? '<tie type="start"/>' : ''}`;
      const tied = `${stop ? '<tied type="stop"/>' : ''}${start ? '<tied type="start"/>' : ''}`;

      return [...pitches]
        .sort((a, b) => a - b)
        .map(
          (pitch, chordIndex) =>
            `<note>${chordIndex ? '<chord/>' : ''}${writePitch(pitch)}<duration>${size}</duration>${ties}<voice>${voice}</voice><type>${type}</type>${dotted ? '<dot/>' : ''}<staff>${staff}</staff>${tied ? `<notations>${tied}</notations>` : ''}</note>`
        )
        .join('');
    })
    .join('');
};

const writeWords = (text: string, staff: number): string =>
  `<direction placement="above"><direction-type><words>${escape(text)}</words></direction-type><staff>${staff}</staff></direction>`;

const writeVoice = (
  chords: readonly Chord[],
  from: number,
  to: number,
  voice: number,
  staff: number,
  words: ReadonlyMap<number, string>
): string => {
  const visible = voice % VOICES_PER_STAFF === 1;
  const inside = chords.filter(
    ({ length, start }) => start < to && start + length > from
  );

  if (!inside.length) {
    return writeRest(to - from, voice, staff, visible, true);
  }

  let cursor = from;
  let written = '';

  inside.forEach(({ length, pitches, start }) => {
    const begin = Math.max(start, from);
    const end = Math.min(start + length, to);

    if (begin > cursor) {
      written += writeRest(begin - cursor, voice, staff, visible, false);
    }

    const text = begin === start ? words.get(start) : undefined;

    written += text ? writeWords(text, staff) : '';
    written += writeChord(
      pitches,
      end - begin,
      voice,
      staff,
      begin > start,
      end < start + length
    );
    cursor = end;
  });

  if (cursor < to) {
    written += writeRest(to - cursor, voice, staff, visible, false);
  }

  return written;
};

const writeAttributes = (meter: Meter, staves: readonly Staff[]): string =>
  `<attributes><divisions>${DIVISIONS}</divisions><key><fifths>0</fifths></key><time><beats>${meter.beats}</beats><beat-type>${meter.beatType}</beat-type></time>${staves.length > 1 ? `<staves>${staves.length}</staves>` : ''}${staves
    .map(
      ({ clef }, index) =>
        `<clef number="${index + 1}"><sign>${clef}</sign><line>${CLEF_LINES[clef]}</line></clef>`
    )
    .join('')}</attributes>`;

const writePart = (
  id: string,
  part: Part,
  meter: Meter,
  bars: readonly number[]
): string => {
  const voices = part.staves.map(({ notes }) => toVoices(notes));
  const words = new Map(
    (part.words ?? []).map(({ start, text }) => [toDivisions(start), text])
  );
  const bounds = bars.map(toDivisions);

  const measures = bounds.slice(0, -1).map((from, index) => {
    const to = bounds[index + 1];
    const body = voices
      .flatMap((staffVoices, staffIndex) =>
        (staffVoices.length ? staffVoices : [[]]).map((chords, voiceIndex) =>
          writeVoice(
            chords,
            from,
            to,
            staffIndex * VOICES_PER_STAFF + voiceIndex + 1,
            staffIndex + 1,
            staffIndex === 0 && voiceIndex === 0 ? words : new Map()
          )
        )
      )
      .join(`<backup><duration>${to - from}</duration></backup>`);

    return `<measure number="${index + 1}">${index === 0 ? writeAttributes(meter, part.staves) : ''}${body}</measure>`;
  });

  return `<part id="${id}">${measures.join('')}</part>`;
};

const writeScorePart = (id: string, { name }: Part): string =>
  `<score-part id="${id}"><part-name>${escape(name)}</part-name></score-part>`;

const writeScore = (
  title: string,
  parts: readonly Part[],
  meter: Meter,
  bars: readonly number[]
): string => {
  const ids = parts.map((_, index) => `P${index + 1}`);

  return `<?xml version="1.0" encoding="UTF-8"?><score-partwise version="4.0"><work><work-title>${escape(title)}</work-title></work><part-list>${parts
    .map((part, index) => writeScorePart(ids[index], part))
    .join('')}</part-list>${parts
    .map((part, index) => writePart(ids[index], part, meter, bars))
    .join('')}</score-partwise>`;
};

export {
  writePart,
  writeScore,
  writeScorePart,
  type Meter,
  type Part,
  type Staff,
  type Written,
};
