import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Skeleton, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useFound } from './use-found';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as MAKER } from '@/views/experiments/swatch/maker/constants';

const CLASS_NAME = `${MAKER}__found`;

const SQUARE = classNames(
  'kicl-aspect-ratio-square',
  'kicl-border-radius-sm',
  'kicl-inline-size-xs'
);

// The color the picture gave, shown while its photograph and film are made.
const Found: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const swatch = useFound();

  if (swatch === undefined) {
    return null;
  }

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      gap='narrow'
      justifyContent='start'
    >
      <output>
        {swatch ? (
          <span
            className={classNames(CLASS_NAME, SQUARE)}
            style={{ backgroundColor: swatch.hex }}
          />
        ) : (
          <Skeleton className={SQUARE} />
        )}
        <Layout autoFlow='row' gap='none' justifyItems='start'>
          <span>
            <Text dense is='span' lookLike='small' variant='secondary'>
              {t('label', { context: 'found' })}
            </Text>
            {swatch ? (
              <>
                <Text is='span'>{swatch.name}</Text>
                <Text dense is='span' lookLike='small' variant='secondary'>
                  <bdi
                    className={classNames(
                      'kicl-font-family-mono',
                      'kicl-text-transform-uppercase'
                    )}
                    dir='ltr'
                  >
                    {swatch.hex}
                  </bdi>
                </Text>
              </>
            ) : (
              <Text is='span'>{t('action', { context: 'generating' })}</Text>
            )}
          </span>
        </Layout>
      </output>
    </Layout>
  );
};

export { Found };
