// API
import type { Kicl_KineticLightReadingsQuery } from 'api/provider';

// Hooks
import type { TFunction } from 'design/hooks';

type Reading = Kicl_KineticLightReadingsQuery['kineticLightReadings'][number];

const progressOf = (t: TFunction, reading: Reading): string => {
  let message = t('progress', { context: 'notes' });

  if (reading.stage === 'CHORDS') {
    message = t('progress', { context: 'chords' });
  }

  if (reading.stage === 'CHORDS' && reading.notes && reading.bars) {
    message = t('found', {
      bars: reading.bars,
      context: 'notes',
      count: reading.notes,
    });
  }

  if (reading.chords.length) {
    message = t('found', { context: 'chords', count: reading.chords.length });
  }

  return message;
};

export { progressOf, type Reading };
