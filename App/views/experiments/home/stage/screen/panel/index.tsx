import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { ListItem } from 'design/components';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

// Partials
import { Plate } from './plate';
import { Words } from './words';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from '@/views/experiments/home/stage/screen/constants';

/**
 * A background and a text block that fade in as the page scrolls to it. All
 * of it is scroll-driven CSS; see styles.scss.
 *
 * The item is the grid and ignores the pointer: stacked above the panel
 * below, it would block that panel's link. Only the text block takes it.
 */
const Panel: React.FunctionComponent = () => {
  const { experiment, index } = useScreenContext();

  return (
    <ListItem
      alignContent='end'
      autoFlow='row'
      gap='none'
      className={classNames(
        CLASS_NAME,
        `${CLASS_NAME}--${experiment.plate}`,
        // These plates are dark in both themes, as on their own pages.
        {
          'kicl--theme--dark':
            experiment.plate === 'image-agent' ||
            experiment.plate === 'kinetic-light',
        },
        'kicl-pointer-events-none',
        'kicl-position-relative'
      )}
      style={{ '--kicl--views--experiments__home--index': index } as never}
    >
      <Plate />
      <Words />
    </ListItem>
  );
};

export { Panel };
