// Piece
import { BASS, stepsOf } from './beat';
import { barOf, lengthOf, type Piece } from './piece';

const MAX_BARS = 512;

const toOutline = (piece: Piece) => {
  const steps = stepsOf(piece);
  const perBar = steps * piece.beatsPerBar;
  const step = barOf(piece) / perBar;
  const bars = Math.min(MAX_BARS, Math.round(lengthOf(piece) / barOf(piece)));
  const marks = Array.from({ length: bars * perBar }, () => '.');

  piece.notes.forEach(({ pitch, time }) => {
    const index = Math.round(time / step);

    if (index >= marks.length || marks[index] === 'b') {
      return;
    }

    marks[index] = pitch < BASS ? 'b' : 'x';
  });

  return {
    bars: Array.from({ length: bars }, (_, bar) =>
      marks.slice(bar * perBar, (bar + 1) * perBar).join('')
    ),
    beatsPerBar: piece.beatsPerBar,
    steps,
    tempo: piece.tempo,
    title: piece.title,
  };
};

export { toOutline };
