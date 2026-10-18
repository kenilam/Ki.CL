import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Image, Layout, Skeleton, Status, Text } from 'design/components';

// Constants
import { CLASS_NAME } from './constants';

type Props = {
  failed: boolean;
  imageUrl: string | null;
  isGenerating: boolean;
  message: string;
  name: string;
};

/** Which `plate` phrase the live region reads out. */
export function announcementFor({
  imageUrl,
  isGenerating,
}: Pick<Props, 'imageUrl' | 'isGenerating'>): 'drawing' | 'ready' | 'none' {
  if (isGenerating) {
    return 'drawing';
  }

  return imageUrl ? 'ready' : 'none';
}

const Plate: React.FC<Props> = ({
  failed,
  imageUrl,
  isGenerating,
  message,
  name,
}) => {
  const { t } = useTranslation('tree-of-life');

  if (!imageUrl && failed) {
    return (
      <Status
        in
        level='warning'
        title={t('title', { context: 'no_plate' })}
        headingLevel='h3'
        message={message}
        justifyContent='start'
        property='fade'
      />
    );
  }

  if (isGenerating) {
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
            <Text
              is='span'
              className={classNames(
                'kicl-font-size-small',
                'kicl-color-grey-dark'
              )}
            >
              {t('plate', { context: 'wait' })}
            </Text>
          </figcaption>
        </figure>
      </Layout>
    );
  }

  if (!imageUrl) {
    return (
      <Status
        in
        level='warning'
        title={t('title', { context: 'no_plate' })}
        headingLevel='h3'
        message={t('error', { context: 'unfinished' })}
        justifyContent='start'
        property='fade'
      />
    );
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
              'kicl-font-size-smaller',
              'kicl-font-weight-bolder',
              'kicl-color-grey-dark',
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

export { Plate };
