import React from 'react';

// Libraries
import classNames from 'classnames';

// Partials
import { Film } from '@/views/experiments/swatch/film';

// Routes
import { useParams } from 'design/router';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CARD } from '@/views/experiments/swatch/card/constants';
import { PARAM } from '@/views/experiments/swatch/constants';

const CLASS_NAME = `${CARD}__backdrop`;

// The film's own layer, so it can drift slower than the chip as the page scrolls.
const Backdrop: React.FunctionComponent = () => {
  const { [PARAM]: id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
    >
      <Film id={id} />
    </span>
  );
};

export { Backdrop };
