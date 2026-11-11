import { useEffect } from 'react';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { PATH as EXPERIMENTS } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/kinetic-light/constants';

const useTitle = (piece: Piece | null) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!piece) {
      return;
    }

    document.title = t('document_title', {
      routes: [EXPERIMENTS, PATH, piece.title].join(' | '),
    });
  }, [piece, t]);
};

export { useTitle };
