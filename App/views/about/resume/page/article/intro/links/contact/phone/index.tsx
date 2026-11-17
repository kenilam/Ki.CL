import React from 'react';

import { HyperLink, ListItem } from 'design/components';

import { PHONE_KEY } from '@/views/about/resume/constants';

const readPhone = () => {
  try {
    return window.localStorage.getItem(PHONE_KEY);
  } catch {
    return null;
  }
};

const Phone: React.FunctionComponent = () => {
  const phone = readPhone();

  if (!phone) {
    return null;
  }

  return (
    <ListItem className='kicl-print-only'>
      <HyperLink className='kicl-font-family-mono' to={`tel:${phone}`}>
        {phone}
      </HyperLink>
    </ListItem>
  );
};

export { Phone };
