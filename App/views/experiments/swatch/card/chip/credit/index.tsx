import React from 'react';

// Components
import { Markdown, Skeleton, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useCard } from '@/views/experiments/swatch/use-card';
import { usePantone } from '@/views/experiments/swatch/card/chip/use-pantone';

const Credit: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const match = usePantone();
  const loading = useCard() === undefined;

  if (loading) {
    return <Skeleton className='kicl-inline-size-lg' />;
  }

  if (!match) {
    return null;
  }

  return (
    <Text dense is='p' lookLike='small' variant='secondary'>
      <Markdown>
        {t('pantone_distance', { distance: match.distance.toFixed(1) })}
      </Markdown>
    </Text>
  );
};

export { Credit };
