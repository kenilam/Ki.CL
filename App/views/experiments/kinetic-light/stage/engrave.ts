// Readers
import type { Note } from '@/views/experiments/kinetic-light/read/piece';
import type { Score } from '@/views/experiments/kinetic-light/read/score';

type Head = {
  pitch: number;
  sounded: boolean;
  staff: number;
  time: number;
  x: number;
  y: number;
};

type Staff = { bottom: number; top: number };

type Sheet = {
  bars: { time: number; x: number }[];
  end: number;
  heads: Head[];
  height: number;
  staves: Staff[];
  svg: string;
  width: number;
};

const UNIT = 10;
const WHOLE = 4;
const MIDI_OFFSET = 12;
const SAME_ONSET = 0.03;

const OPTIONS = {
  autoBeam: true,
  autoResize: false,
  backend: 'svg',
  drawComposer: false,
  drawCredits: false,
  drawLyricist: false,
  drawMeasureNumbers: false,
  drawMetronomeMarks: false,
  drawPartNames: false,
  drawSubtitle: false,
  drawTitle: false,
  renderSingleHorizontalStaffline: true,
};

const engrave = async (
  { bars, musicxml, quarters }: Score,
  played: readonly Note[]
): Promise<Sheet | null> => {
  const { OpenSheetMusicDisplay } = await import('opensheetmusicdisplay');
  const host = document.createElement('div');
  const osmd = new OpenSheetMusicDisplay(host, OPTIONS);

  osmd.setLogLevel('error');
  osmd.EngravingRules.SheetMaximumWidth = Number.MAX_SAFE_INTEGER;
  await osmd.load(musicxml);
  osmd.render();

  const svg = host.querySelector('svg');
  const [system] = osmd.GraphicSheet.MusicPages[0]?.MusicSystems ?? [];

  if (!svg || !system) {
    return null;
  }

  const measures = osmd.GraphicSheet.MeasureList;
  const order = system.StaffLines.map(
    ({ ParentStaff }) => ParentStaff.idInMusicSheet
  );
  const staves = system.StaffLines.map(
    ({ PositionAndShape, StaffHeight }): Staff => {
      const top = PositionAndShape.AbsolutePosition.y * UNIT;

      return { bottom: top + StaffHeight * UNIT, top };
    }
  );

  const sources = measures.map((row) => row.find(Boolean)?.parentSourceMeasure);

  const heads: Head[] = [];

  measures.forEach((row, index) => {
    const source = sources[index];

    if (!source) {
      return;
    }

    const bar = Math.min(index, bars.length - 2);
    const start = source.AbsoluteTimestamp.RealValue;
    const beats = quarters[bar + 1] - quarters[bar] || 1;
    const toSeconds = (wholes: number) =>
      ((wholes * WHOLE) / beats) * (bars[bar + 1] - bars[bar]);

    row.forEach((measure) =>
      measure?.staffEntries.forEach(({ graphicalVoiceEntries }) =>
        graphicalVoiceEntries.forEach(({ notes, parentVoiceEntry }) =>
          notes.forEach(({ PositionAndShape, sourceNote }) => {
            const staff = order.indexOf(sourceNote.ParentStaff.idInMusicSheet);
            const time =
              bars[bar] +
              toSeconds(sourceNote.getAbsoluteTimestamp().RealValue - start);

            if (staff < 0 || parentVoiceEntry.IsGrace || sourceNote.isRest()) {
              return;
            }

            const pitch = sourceNote.halfTone + MIDI_OFFSET;

            heads.push({
              pitch,
              sounded: played.some(
                (note) =>
                  note.pitch === pitch &&
                  Math.abs(note.time - time) < SAME_ONSET
              ),
              staff,
              time,
              x: PositionAndShape.AbsolutePosition.x * UNIT,
              y: PositionAndShape.AbsolutePosition.y * UNIT,
            });
          })
        )
      )
    );
  });

  const last = measures[measures.length - 1]?.find(Boolean)?.PositionAndShape;

  return {
    end: last ? (last.AbsolutePosition.x + last.Size.width) * UNIT : 0,
    bars: measures.map((row, index) => ({
      time: bars[Math.min(index, bars.length - 1)],
      x: (row.find(Boolean)?.PositionAndShape.AbsolutePosition.x ?? 0) * UNIT,
    })),
    heads: heads.sort((a, b) => a.time - b.time || a.staff - b.staff),
    height: Number(svg.getAttribute('height')) || 0,
    staves,
    svg: new XMLSerializer().serializeToString(svg),
    width: Number(svg.getAttribute('width')) || 0,
  };
};

export { engrave, type Head, type Sheet };
