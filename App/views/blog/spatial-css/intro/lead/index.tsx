import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animated } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSeen } from '@/views/use-seen';

const Lead: React.FunctionComponent = () => {
  const { t } = useTranslation('blog');
  const { ref, seen } = useSeen<HTMLElement>();

  return (
    <Animated.Text
      className={classNames(
        'kicl-max-inline-size-columns-4',
        'kicl-text-hyphenate',
        'kicl-text-wrap-balance'
      )}
      delay={120}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      ref={ref}
      stagger={20}
    >
      {t('description', { context: 'spatial_css' })}
    </Animated.Text>
  );
};

export { Lead };
