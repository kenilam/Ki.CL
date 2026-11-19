import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animated } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useInverse } from '@/views/use-inverse';

// Widgets
import { Background } from 'design/widgets';

// Constants
import { LIFT, TITLE_ID } from '@/views/blog/spatial-css/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('blog');
  const inverse = useInverse();

  return (
    <Animated.Heading
      className={classNames(
        LIFT,
        'kicl-overflow-wrap-break-word',
        'kicl-position-relative',
        'kicl-hyphens-auto'
      )}
      easing='ease-expo-out'
      hold
      id={TITLE_ID}
      in
      is='h1'
      lookLike='display'
      media={<Background className={inverse} />}
      stagger={60}
    >
      {t('title', { context: 'spatial_css' })}
    </Animated.Heading>
  );
};

export { Title };
