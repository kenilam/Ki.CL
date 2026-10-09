import React from 'react';

// Components
import { HyperLink, Text } from 'design/components';

// Content
import { EMAIL, LOCATION, PROFILES } from '@/views/resume/content';

// Constants
import { PHONE_KEY } from '@/views/resume/constants';

const SEPARATOR = ' · ';

/** The phone number, on a machine that has been given one. See `PHONE_KEY`. */
const readPhone = () => {
  try {
    return window.localStorage.getItem(PHONE_KEY);
  } catch {
    // Storage can be blocked. The line is complete without the number.
    return null;
  }
};

/** Two lines, as on the printed page: where and how to write, then the profiles. */
const Contact: React.FunctionComponent = () => {
  const phone = readPhone();

  return (
    <address className='kicl-font-style-normal'>
      <Text dense>
        {LOCATION}
        <Text className='kicl-print-only' is='span'>
          {SEPARATOR}
        </Text>
        {/* The address is for paper. A screen opens the form. */}
        <HyperLink className='kicl-print-only' to={`mailto:${EMAIL}`}>
          {EMAIL}
        </HyperLink>
        {phone && `${SEPARATOR}${phone}`}
      </Text>
      <Text dense>
        {PROFILES.map(({ link, to }, index) => (
          <React.Fragment key={to}>
            {index > 0 && SEPARATOR}
            <HyperLink to={to}>{link}</HyperLink>
          </React.Fragment>
        ))}
      </Text>
    </address>
  );
};

export { Contact };
