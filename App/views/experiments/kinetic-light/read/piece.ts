type Note = {
  duration: number;
  pitch: number;
  time: number;
  velocity: number;
};

type Piece = {
  beatsPerBar: number;
  drums?: Note[];
  notes: Note[];
  source: 'chords' | 'notes' | 'sheet' | 'sheet_chords';
  tempo: number;
  title: string;
};

const LOWEST = 21;
const HIGHEST = 108;
const MAX_NOTES = 20000;

const toPiece = <T extends Piece>(piece: T): T => ({
  ...piece,
  notes: piece.notes
    .filter(
      ({ duration, pitch, time }) =>
        duration > 0 && time >= 0 && pitch >= LOWEST && pitch <= HIGHEST
    )
    .sort((a, b) => a.time - b.time || a.pitch - b.pitch)
    .slice(0, MAX_NOTES),
});

const BAR_TOLERANCE = 0.001;

const stem = (name: string): string => name.replace(/\.[^.]+$/, '');

const barOf = (piece: Piece): number => (60 / piece.tempo) * piece.beatsPerBar;

const lengthOf = (piece: Piece): number => {
  const bar = barOf(piece);
  const end = Math.max(
    0,
    ...piece.notes.map(({ duration, time }) => time + duration)
  );

  return Math.max(1, Math.ceil(end / bar - BAR_TOLERANCE)) * bar;
};

export { barOf, lengthOf, stem, toPiece, type Note, type Piece };
