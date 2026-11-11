// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePieceContext } from '@/views/experiments/kinetic-light/song/context';
import {
  useArrangerContext,
  useTransportContext,
} from '@/views/experiments/kinetic-light/song/player/context';

const useLine = (): string => {
  const { piece } = usePieceContext();
  const arranger = useArrangerContext();
  const transport = useTransportContext();
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };

  let line = translations.kineticLight.t('source', { context: piece.source });

  if (transport.voice === 'wurlitzer') {
    line = translations.kineticLight.t('credit', { context: 'wurlitzer' });
  }

  if (transport.status === 'loading') {
    line = translations.kineticLight.t('status', { context: 'loading' });
  }

  if (arranger.arranging) {
    line = translations.common.t('arranging');
  }

  if (arranger.error) {
    line = arranger.error.message;
  }

  if (transport.error) {
    line = translations.kineticLight.t('error', { context: 'playback' });
  }

  return line;
};

export { useLine };
