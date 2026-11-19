import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animated } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSeen } from '@/views/use-seen';

// Constants
import type { Section } from '@/views/blog/spatial-css/article/constants';
import { LIFT } from '@/views/blog/spatial-css/constants';

type Props = { id: Section };

const Title: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('spatial-css');
  const { ref, seen } = useSeen<HTMLHeadingElement>();

  return (
    <Animated.Heading
      className={classNames(
        LIFT,
        'kicl-position-relative',
        'kicl-scroll-shift-narrow',
        'kicl-text-wrap-balance'
      )}
      easing='ease-expo-out'
      hold
      in={seen}
      is='h2'
      lookLike='h1'
      property='slide-from-left'
      ref={ref}
      stagger={60}
    >
      {t(`article.${id}.title`)}
    </Animated.Heading>
  );
};

export { Title };
