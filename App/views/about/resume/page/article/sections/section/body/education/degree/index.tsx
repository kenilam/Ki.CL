import React from 'react';

import classNames from 'classnames';

import { Animated, Animation, Image, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/about/use-seen';

import type { Key } from '@/views/about/resume/content';
import { useVersion } from '@/views/about/resume/context';

import { CLASS_NAME as SECTION } from '@/views/about/resume/page/article/sections/section/constants';
import { LOGOS } from '@/views/about/resume/page/article/sections/section/body/education/constants';

type Props = { id: Key };

const SEPARATOR = ' · ';

/** The course is the line's first link, and the schools follow it. */
const COURSE = /^(\[[^\]]+\]\([^)]+\)),\s*(.*)$/s;

const Degree: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('resume');
  const { slug } = useVersion();
  const { ref, seen } = useSeen<HTMLLIElement>();
  const [degree, year] = t(id, {
    context: slug.replace('-', '_'),
    defaultValue: id,
  }).split(SEPARATOR);
  const logo = LOGOS[id];
  const [, course = degree, schools] = degree.match(COURSE) ?? [];

  return (
    <ListItem gap='narrow' justifyItems='start' ref={ref}>
      <Animation
        duration='slow'
        easing='ease-expo-out'
        hold
        in={seen}
        property='slide-from-left'
      >
        <Image
          alt=''
          className={`${SECTION}__school`}
          data={logo}
          loading='lazy'
        />
      </Animation>
      <Animated.Text
        className='kicl-font-family-mono'
        delay={150}
        dense
        duration='slow'
        easing='ease-expo-out'
        hold
        in={seen}
        lookLike='small'
        property='fade'
        variant='secondary'
      >
        {year}
      </Animated.Text>
      <Animated.Text
        className={classNames(
          `${SECTION}__degree`,
          'kicl-line-height-narrow',
          'kicl-text-hyphenate'
        )}
        delay={150}
        dense
        easing='ease-expo-out'
        hold
        in={seen}
        property='slide-from-left'
        stagger={60}
      >
        {course}
      </Animated.Text>
      {schools ? (
        <Animated.Text
          className='kicl-text-hyphenate'
          delay={300}
          dense
          duration='slow'
          easing='ease-expo-out'
          hold
          in={seen}
          property='fade'
          stagger={12}
        >
          {schools}
        </Animated.Text>
      ) : null}
    </ListItem>
  );
};

export { Degree };
