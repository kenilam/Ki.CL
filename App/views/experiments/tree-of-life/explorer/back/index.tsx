import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { BackLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { toPath } from '@/views/experiments/tree-of-life/constants';
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/constants';

const Back: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('experiment', { context: 'tree_of_life' })}
      className={classNames(
        `${CLASS_NAME}__chrome`,
        'kicl-position-fixed',
        'kicl-z-index-floating',
        'kicl-inset-block-end',
        'kicl-inset-inline-end'
      )}
    >
      <BackLink to={toPath()} />
    </nav>
  );
};

export { Back };
