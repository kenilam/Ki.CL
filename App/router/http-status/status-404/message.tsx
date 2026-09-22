import React from 'react';

// Router
import { useLocation } from '@/router';

// Components
import { Text } from '@/components';

const COPY = {
  before: 'The page ',
  after:
    ' you are looking for might have been removed, had its name changed, or it temporarily unavailable.',
};

const Message: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  return (
    <Text>
      {COPY.before}
      <Text is='span' lookLike='h3'>
        {pathname}
      </Text>
      {COPY.after}
    </Text>
  );
};

export { Message };
