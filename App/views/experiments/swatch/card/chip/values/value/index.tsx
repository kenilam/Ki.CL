import React from 'react';

// Components
import { Layout, Skeleton, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useCard } from '@/views/experiments/swatch/use-card';
import { usePantone } from '@/views/experiments/swatch/card/chip/use-pantone';

// Helpers
import { channelsOf, cmykOf } from '@/views/experiments/swatch/color';

// Constants
import type { Term } from '@/views/experiments/swatch/card/chip/values/constants';

type Props = { term: Term };

const Value: React.FunctionComponent<Props> = ({ term }) => {
  const { t } = useTranslation('swatch');
  const hex = useCard()?.hex;
  const pantone = usePantone()?.name;

  if (!hex) {
    return (
      <Layout autoFlow='column' frames='5fr--7fr' gap='narrowest'>
        <div>
          <dt>
            <Skeleton className='kicl-inline-size-xs' />
          </dt>
          <dd>
            <Skeleton className='kicl-inline-size-md' />
          </dd>
        </div>
      </Layout>
    );
  }

  const VALUES = {
    cmyk: cmykOf(hex).join(', '),
    hex,
    pantone,
    rgb: channelsOf(hex).join(', '),
  };

  if (!VALUES[term]) {
    return null;
  }

  return (
    <Layout autoFlow='column' frames='5fr--7fr' gap='narrowest'>
      <div>
        <dt>
          <Text is='strong' lookLike='small'>
            {t('term', { context: term })}
          </Text>
        </dt>
        <dd>
          <Text is='span' lookLike='small'>
            <bdi dir='ltr'>{VALUES[term]}</bdi>
          </Text>
        </dd>
      </div>
    </Layout>
  );
};

export { Value };
