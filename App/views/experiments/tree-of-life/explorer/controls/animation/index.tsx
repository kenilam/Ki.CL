import React from 'react';

// Components
import { Button, Text } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useAnimateContext } from '@/views/experiments/tree-of-life/animate-context';

const Animation: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { animate, setAnimate } = useAnimateContext();

  return (
    <Button
      unstyled
      type='button'
      alignItems='center'
      before={<Tb.TbBulbFilled aria-hidden />}
      gap='narrower'
      className={animate ? 'kicl-color-green' : 'kicl-color-grey-700'}
      aria-pressed={animate}
      title={t('hint', { context: animate ? 'land' : 'play' })}
      onClick={() => {
        setAnimate((current) => {
          return !current;
        });
      }}
    >
      <Text is='span' unstyled>
        {t('animation')}
      </Text>
    </Button>
  );
};

export { Animation };
