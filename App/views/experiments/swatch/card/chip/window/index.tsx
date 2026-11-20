import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Skeleton } from 'design/components';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/swatch/constants';

const CLASS_NAME = `${VIEW}__chip__window`;

// A hole in the chip onto the film behind it, with the shadow the cloth casts on the paper.
const Window: React.FunctionComponent = () => {
  const loading = useCard() === undefined;

  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-aspect-ratio-square',
        'kicl-display-grid'
      )}
    >
      {loading ? <Skeleton className={`${CLASS_NAME}__skeleton`} /> : null}
      <span className={`${CLASS_NAME}__shadow`} />
    </span>
  );
};

export { Window };
