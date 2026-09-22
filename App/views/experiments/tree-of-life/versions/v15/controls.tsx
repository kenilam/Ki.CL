import React from 'react';

// Components
import { Button, Layout, Spinner, Text } from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { useTreeOfLifeContext } from '@/views/experiments/tree-of-life/context';

// Constants
import { CLASS_NAME } from './constants';

const COPY = {
  label: 'animation',
  land: 'Land the tree at once',
  play: 'Play the tree out branch by branch',
};

const Controls: React.FunctionComponent = () => {
  const { animate, loading, setAnimate } = useTreeOfLifeContext();

  return (
    <Layout
      className={`${CLASS_NAME}__chrome kicl-position-fixed kicl-inset-block-start kicl-inset-inline-end`}
      alignItems='center'
      autoFlow='column'
      justifyContent='end'
      gap='narrower'
    >
      <div>
        <Spinner
          size='small'
          in={loading}
          position='inline'
          hasBackdrop={false}
        />
        <Button
          unstyled
          type='button'
          alignItems='center'
          gap='narrower'
          className={animate ? 'kicl-color-green' : 'kicl-color-grey-dark'}
          aria-label={COPY.play}
          aria-pressed={animate}
          title={animate ? COPY.land : COPY.play}
          onClick={() => setAnimate((current) => !current)}
        >
          <Ri.RiFlashlightFill aria-hidden />
          <Text is='span' dense unstyled className='kicl-font-size-small'>
            {COPY.label}
          </Text>
        </Button>
      </div>
    </Layout>
  );
};

export { Controls };
