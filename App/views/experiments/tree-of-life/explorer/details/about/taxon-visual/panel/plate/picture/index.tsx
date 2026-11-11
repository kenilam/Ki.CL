import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Image, Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTaxonVisualContext } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/context';

// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/constants';

const Picture: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { imageUrl, name } = useTaxonVisualContext();

  if (!imageUrl) {
    return null;
  }

  return (
    <Layout gap='narrowest'>
      <figure>
        <Image
          data={imageUrl}
          alt={t('plate', {
            context: 'alt',
            name: name || t('this_taxon'),
          })}
          className={classNames(
            `${CLASS_NAME}__taxon-plate`,
            'kicl-aspect-ratio-square'
          )}
        />
        <figcaption>
          <Text
            dense
            is='p'
            className={classNames(
              'kicl-font-weight-bolder',
              'kicl-color-grey-700',
              'kicl-line-height-narrow'
            )}
          >
            {t('plate', { context: 'disclaimer' })}
          </Text>
        </figcaption>
      </figure>
    </Layout>
  );
};

export { Picture };
