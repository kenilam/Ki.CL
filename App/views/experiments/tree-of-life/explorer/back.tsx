import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { HyperLink } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Constants
import { toPath } from '@/views/experiments/tree-of-life/constants';
import { CLASS_NAME } from './constants';

const Back: React.FunctionComponent = () => {
  const { t: common } = useTranslation();

  return (
    <nav
      aria-label={common('experiment', { context: 'tree_of_life' })}
      className={classNames(
        `${CLASS_NAME}__chrome`,
        'kicl-position-fixed',
        'kicl-z-index-floating',
        'kicl-inset-block-end',
        'kicl-inset-inline-end'
      )}
    >
      <HyperLink
        before={<Ri.RiArrowLeftSLine aria-hidden />}
        to={toPath()}
        unstyled
      >
        {common('action', { context: 'back' })}
      </HyperLink>
    </nav>
  );
};

export { Back };
