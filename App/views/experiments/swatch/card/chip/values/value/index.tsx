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
      <>
        <Layout span={4}>
          <dt>
            <Skeleton className='kicl-inline-size-xs' />
          </dt>
        </Layout>
        <Layout span={8}>
          <dd>
            <Skeleton className='kicl-inline-size-md' />
          </dd>
        </Layout>
      </>
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
    <>
      <Layout span={4}>
        <dt>
          <Text is='strong' lookLike='small'>
            {t('term', { context: term })}
          </Text>
        </dt>
      </Layout>
      <Layout span={8}>
        <dd>
          <Text is='span' lookLike='small'>
            <bdi dir='ltr'>{VALUES[term]}</bdi>
          </Text>
        </dd>
      </Layout>
    </>
  );
};

export { Value };
