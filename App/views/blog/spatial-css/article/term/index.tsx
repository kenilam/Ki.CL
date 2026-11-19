import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Text } from 'design/components';

// Constants
import {
  TERMS,
  type Section,
} from '@/views/blog/spatial-css/article/constants';

type Props = { id: Section };

const Term: React.FunctionComponent<Props> = ({ id }) => {
  const term = TERMS[id];

  if (!term) {
    return null;
  }

  return (
    <Text
      className={classNames(
        'kicl-font-family-mono',
        'kicl-scroll-shift-narrow',
        'kicl-text-box-trim-start'
      )}
      dense
      dir='ltr'
      is='span'
      lookLike='small'
      variant='secondary'
    >
      {term}
    </Text>
  );
};

export { Term };
