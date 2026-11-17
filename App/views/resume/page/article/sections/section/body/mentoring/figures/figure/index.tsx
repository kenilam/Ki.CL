import React from 'react';

import { Animated, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/use-seen';

import { useValue } from './use-value';

import { type Figure as Id } from '@/views/resume/page/article/sections/section/body/mentoring/figures/constants';

type Props = { id: Id };

const Figure: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('resume');
  const { ref, seen } = useSeen<HTMLLIElement>();
  const value = useValue(id);

  if (!value) {
    return null;
  }

  return (
    <ListItem ref={ref} gap='none'>
      <Animated.Text
        characterSet={`${value}1234567890`}
        dense
        in={seen}
        lookLike='h1'
        property='scramble'
      >
        {value}
      </Animated.Text>
      <Animated.Text
        dense
        in={seen}
        property='slide-from-bottom'
        split='letter'
        variant='secondary'
      >
        {t('figure', { context: id })}
      </Animated.Text>
    </ListItem>
  );
};

export { Figure };
