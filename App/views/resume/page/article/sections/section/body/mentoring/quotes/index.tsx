import React from 'react';

import { Kicl_MentorshipDocument, useQuery } from 'api/client';

import { List } from 'design/components';

import { Provider } from './context';
import { Quote } from './quote';

import { MINIMUM, MOST } from './constants';

const Quotes: React.FunctionComponent = () => {
  const { data } = useQuery(Kicl_MentorshipDocument);

  const quotes = (data?.mentorship?.quotes ?? [])
    .filter(({ text }) => {
      return text.length >= MINIMUM;
    })
    .slice(0, MOST);

  return (
    <Provider>
      <List autoFlow='row' className='kicl-print-hidden' gap='wide'>
        {quotes.map(({ writtenAt }) => {
          return <Quote key={writtenAt} writtenAt={writtenAt} />;
        })}
      </List>
    </Provider>
  );
};

export { Quotes };
