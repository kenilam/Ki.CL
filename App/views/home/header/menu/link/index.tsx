import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ROUTES } from '@/views/routes';

type Props = Pick<(typeof ROUTES)[number], 'to'>;

const Link: React.FunctionComponent<Props> = ({ to }) => {
  const { t } = useTranslation();
  const route = ROUTES.find((each) => {
    return each.to === to;
  });

  if (!route) {
    return null;
  }

  return <HyperLink to={to}>{t(route.key)}</HyperLink>;
};

export { Link };
