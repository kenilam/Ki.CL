import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Skeleton, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/constants';

const Drawing: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Layout gap='narrowest'>
      <figure aria-busy='true'>
        <Skeleton
          aria-hidden
          className={classNames(
            `${CLASS_NAME}__taxon-plate-skeleton`,
            'kicl-aspect-ratio-square'
          )}
        />
        <figcaption>
          <Text is='span' className='kicl-color-grey-700'>
            {t('plate', { context: 'wait' })}
          </Text>
        </figcaption>
      </figure>
    </Layout>
  );
};

export { Drawing };
