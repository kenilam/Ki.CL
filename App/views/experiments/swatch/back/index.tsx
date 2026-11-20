import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { BackLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/swatch/constants';

const Back: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <BackLink
      className={classNames('kicl-align-self-start', 'kicl-position-relative')}
      label={t('experiments')}
      to={toExperimentsPath(PATH)}
    />
  );
};

export { Back };
