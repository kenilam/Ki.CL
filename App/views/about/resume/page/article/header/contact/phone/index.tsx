import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink } from 'design/components';

// Constants
import { PHONE_KEY } from '@/views/about/resume/constants';

/** The phone number, on a machine that has been given one. See `PHONE_KEY`. */
const readPhone = () => {
  try {
    return window.localStorage.getItem(PHONE_KEY);
  } catch {
    // Storage can be blocked. The line is complete without the number.
    return null;
  }
};

const Phone: React.FunctionComponent = () => {
  const phone = readPhone();

  if (!phone) {
    return null;
  }

  return (
    <HyperLink
      before={<Tb.TbDeviceMobile />}
      className='kicl-print-only'
      to={`tel:${phone}`}
    >
      {phone}
    </HyperLink>
  );
};

export { Phone };
