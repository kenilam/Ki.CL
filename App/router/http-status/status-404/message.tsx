import React from 'react';

// Router
import { useLocation } from '@/router';

// Components
import { Text } from '@/components';

const COPY = {
  before: 'The page ',
  after:
    ' you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
};

const Message: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  return (
    <Text>
      {COPY.before}
      <Text className='kicl-font-weight-bold' is='code'>
        {pathname}
      </Text>
      {COPY.after}
    </Text>
  );
};

export { Message };
