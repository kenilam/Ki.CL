import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Header: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Heading dense is='h2' lookLike='h3'>
      {t('experiment', { context: 'swatch' })}
    </Heading>
  );
};

export { Header };
