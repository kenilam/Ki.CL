import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { usePrinting, useTranslation } from 'design/hooks';

const Email: React.FunctionComponent = () => {
  const { t } = useTranslation();

  const printing = usePrinting();

  const email = t('email');

  if (!printing) {
    return null;
  }

  return (
    <HyperLink
      before={<Tb.TbMail />}
      className='kicl-print-only'
      to={`mailto:${email}`}
    >
      {email}
    </HyperLink>
  );
};

export { Email };
