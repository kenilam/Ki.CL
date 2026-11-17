import React from 'react';

import classNames from 'classnames';

import { Animated, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/about/use-seen';

import { CLASS_NAME as SECTION } from '@/views/about/resume/page/article/sections/section/constants';
import {
  LANGUAGES,
  type Language as Entry,
} from '@/views/about/resume/page/article/sections/section/body/languages/constants';

type Props = Pick<Entry, 'lang'>;

const DELAY = 150;

const STEP = 120;

const Language: React.FunctionComponent<Props> = ({ lang }) => {
  const { t } = useTranslation('resume');
  const { ref, seen } = useSeen<HTMLLIElement>();
  const at = LANGUAGES.findIndex((each) => {
    return each.lang === lang;
  });
  const { context, name } = LANGUAGES[at];
  const label = t('language', { context });

  return (
    <ListItem alignItems='baseline' display='flex' gap='normal' ref={ref} wrap>
      <Animated.Text
        className={classNames(
          `${SECTION}__language`,
          'kicl-line-height-narrow'
        )}
        delay={DELAY + at * STEP}
        dense
        easing='ease-expo-out'
        hold
        in={seen}
        is='span'
        lang={lang}
        property='slide-from-left'
        stagger={60}
      >
        {name}
      </Animated.Text>
      {label === name ? null : (
        <Animated.Text
          className='kicl-font-family-mono'
          delay={DELAY + at * STEP + 150}
          dense
          duration='slow'
          easing='ease-expo-out'
          hold
          in={seen}
          is='span'
          lookLike='small'
          property='fade'
          stagger={12}
          variant='secondary'
        >
          {label}
        </Animated.Text>
      )}
    </ListItem>
  );
};

export { Language };
