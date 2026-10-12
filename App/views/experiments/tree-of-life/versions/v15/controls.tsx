import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Button, Layout, Spinner, Text } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { useTreeOfLifeContext } from '@/views/experiments/tree-of-life/context';

// Constants
import { CLASS_NAME } from './constants';

const Controls: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { animate, loading, setAnimate } = useTreeOfLifeContext();

  return (
    <Layout
      className={classNames(
        `${CLASS_NAME}__chrome`,
        'kicl-position-fixed',
        'kicl-z-index-floating',
        'kicl-inset-block-start',
        'kicl-inset-inline-end'
      )}
      alignItems='center'
      autoFlow='column'
      justifyContent='end'
      gap='narrower'
    >
      <section aria-label={t('label', { context: 'animation' })}>
        <Spinner size='small' in={loading} position='inline' backdrop={false} />
        <Button
          unstyled
          type='button'
          alignItems='center'
          before={<Ri.RiFlashlightFill aria-hidden />}
          gap='narrower'
          className={animate ? 'kicl-color-green' : 'kicl-color-grey-dark'}
          aria-pressed={animate}
          title={t('hint', { context: animate ? 'land' : 'play' })}
          onClick={() => setAnimate((current) => !current)}
        >
          <Text is='span' unstyled className='kicl-font-size-small'>
            {t('animation')}
          </Text>
        </Button>
      </section>
    </Layout>
  );
};

export { Controls };
