import React from 'react';

// Components
import { ListItem } from 'design/components';

// Partials
import { Link } from './link';
import { Time } from './time';

// Constants
import type { PLACES } from '@/views/experiments/daylight/constants';

type Props = Pick<(typeof PLACES)[number], 'context'>;

const Place: React.FunctionComponent<Props> = ({ context }) => {
  return (
    <ListItem
      alignItems='center'
      autoFlow='column'
      display='grid'
      frames='1fr--max-content'
      justifyItems='stretch'
    >
      <Link context={context} />
      <Time context={context} />
    </ListItem>
  );
};

export { Place };
