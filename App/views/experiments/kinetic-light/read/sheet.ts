// Piece
import { readChords, toChordNotes, type Mark } from './chords';
import { readMusicXml } from './musicxml';
import { toPiece, type Piece } from './piece';

const UNDER_NOTES = 0.5;

const readSheet = (sheet: {
  beatsPerBar?: number | null;
  chords: readonly Mark[];
  musicxml?: string | null;
  tempo?: number | null;
  title: string;
}): Piece | null => {
  const { title } = sheet;
  const score = sheet.musicxml
    ? readMusicXml(sheet.musicxml, title, sheet.tempo)
    : null;

  if (!score?.notes.length) {
    return sheet.chords.length && sheet.tempo && sheet.beatsPerBar
      ? readChords({
          beatsPerBar: sheet.beatsPerBar,
          chords: sheet.chords,
          tempo: sheet.tempo,
          title,
        })
      : null;
  }

  const chords = toChordNotes(
    sheet.chords,
    score.bars,
    60 / (sheet.tempo ?? score.tempo),
    UNDER_NOTES
  );

  return toPiece({
    ...score,
    notes: [...score.notes, ...chords],
    source: chords.length ? 'sheet_chords' : 'sheet',
    title,
  });
};

export { readSheet };
