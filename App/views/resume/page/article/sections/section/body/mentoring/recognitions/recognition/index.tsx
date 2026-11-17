import React from 'react';

import {
  Animated,
  Animation,
  Badge,
  HyperLink,
  Image,
  Layout,
  ListItem,
} from 'design/components';

import { useSeen } from '@/views/use-seen';

import { useRecognition } from '@/views/resume/page/article/sections/section/body/mentoring/recognitions/use-recognition';

import type { Recognition as Entry } from '@/views/resume/page/article/sections/section/body/mentoring/recognitions/constants';

type Props = Pick<Entry, 'certificate'>;

const DELAY = 350;

const STEP = 60;

const Recognition: React.FunctionComponent<Props> = ({ certificate }) => {
  const { ref, seen } = useSeen<HTMLLIElement>();
  const recognition = useRecognition(certificate);

  return (
    <Animation
      delay={DELAY + recognition.position * STEP}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
    >
      <ListItem ref={ref}>
        <Layout autoFlow='row' gap='narrower' justifyItems='center'>
          <HyperLink to={recognition.to} unstyled>
            <Image alt='' data={recognition.image} loading='lazy' />
            <Animated.Text
              delay={DELAY + recognition.position * STEP}
              dense
              in={seen}
              lookLike='strong'
              property='slide-from-bottom'
              split='letter'
            >
              {recognition.title}
            </Animated.Text>
            <Badge variant='secondary' level='confirm'>
              {recognition.period}
            </Badge>
          </HyperLink>
        </Layout>
      </ListItem>
    </Animation>
  );
};

export { Recognition };
