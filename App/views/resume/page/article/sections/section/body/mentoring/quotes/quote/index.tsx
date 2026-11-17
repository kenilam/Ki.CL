import React from 'react';

import { Animated, ListItem } from 'design/components';

import { useSeen } from '@/views/use-seen';

import { Body } from './body';

import { useQuote, type Quote as Entry } from './use-quote';

type Props = Pick<Entry, 'writtenAt'>;

const STEP = 120;

const Quote: React.FunctionComponent<Props> = ({ writtenAt }) => {
  const { ref, seen } = useSeen<HTMLLIElement>();
  const quote = useQuote(writtenAt);

  if (!quote) {
    return null;
  }

  return (
    <ListItem className='kicl-position-relative' gap='narrow' ref={ref}>
      <Body writtenAt={writtenAt} />
      <Animated.Text
        delay={quote.position * STEP}
        dense
        hold
        in={seen}
        is='cite'
        property='slide-from-bottom'
        split='letter'
        variant='secondary'
      >
        {quote.by}
      </Animated.Text>
    </ListItem>
  );
};

export { Quote };
