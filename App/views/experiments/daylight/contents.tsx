import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Hooks
import { useNow } from './use-now';

// Partials
import { Orb } from './orb';
import { Places } from './places';
import { Words } from './words';

// Utilities
import { toHome } from './home';
import type { Coordinates } from './sun';

// Constants
import { CLASS_NAME, PLACES } from './constants';

/**
 * The Earth as an ink drawing, lit by where the sun is now. The
 * globe starts facing about where the visitor is; picking a place turns it.
 */
const Daylight: React.FunctionComponent = () => {
  const now = useNow();
  const [active, setActive] = useState(-1);
  const [centre, setCentre] = useState<Coordinates>(() => toHome(now));

  return (
    <Layout autoFlow='row' gap='none'>
      {/* The frame clips the drawing to the page. */}
      <Frame grow hold>
        {/* The words, then the places under them, at the top. */}
        <Layout alignContent='start' autoFlow='row' gap='narrow'>
          {/* The picture is black in both themes, so what is over it is always dark-themed. */}
          <article
            className={classNames(
              CLASS_NAME,
              'kicl--theme--dark',
              'kicl-position-relative'
            )}
          >
            <Orb active={active} centre={centre} date={now} places={PLACES} />
            <Words />
            <Places
              active={active}
              date={now}
              onPick={(index) => {
                setActive(index);
                /* A new object each time, so picking the same place turns back to it. */
                setCentre({ ...PLACES[index] });
              }}
            />
          </article>
        </Layout>
      </Frame>
    </Layout>
  );
};

export { Daylight };
