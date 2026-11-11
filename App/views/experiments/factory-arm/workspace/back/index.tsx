import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { BackLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/factory-arm/constants';

const Back: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <BackLink
      className={classNames(
        'kicl-position-fixed',
        'kicl-inset-block-start',
        'kicl-inset-inline-start',
        'kicl-z-index-floating'
      )}
      label={t('experiments')}
      to={toExperimentsPath(PATH)}
    />
  );
};

export { Back };
