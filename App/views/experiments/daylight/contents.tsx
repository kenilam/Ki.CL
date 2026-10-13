import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, Frame, Layout } from 'design/components';

// Hooks
import { useNow } from './use-now';

// Partials
import { Glass } from './glass';
import { Places } from './places';
import { Words } from './words';

// Utilities
import { toHome } from './home';
import type { Coordinates } from './sun';

// Constants
import { CLASS_NAME, PLACES } from './constants';

/**
 * The Earth as a stained-glass window, lit by where the sun is now. The
 * globe starts facing about where the visitor is; picking a place turns it.
 */
const Daylight: React.FunctionComponent = () => {
  const now = useNow();
  const [active, setActive] = useState(-1);
  const [centre, setCentre] = useState<Coordinates>(() => toHome(now));

  return (
    <Layout autoFlow='row' gap='none'>
      {/* The frame clips the window to the page. */}
      <Frame grow hold>
        {/* The pane keeps its own size, at the top of the start side. */}
        <Layout alignItems='start' justifyItems='start'>
          <article
            className={classNames(
              CLASS_NAME,
              'kicl-padding-block-frame',
              'kicl-padding-inline-frame',
              'kicl-position-relative'
            )}
          >
            <Glass active={active} centre={centre} date={now} places={PLACES} />
            {/* One pane over the glass, so the words stay readable on it. */}
            <Card
              className='kicl-position-relative'
              is='section'
              size={3}
              variant='ghost'
            >
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
            </Card>
          </article>
        </Layout>
      </Frame>
    </Layout>
  );
};

export { Daylight };
