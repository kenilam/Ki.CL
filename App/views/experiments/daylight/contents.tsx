import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Navigate, useNavigate, useParams } from 'design/router';

// Components
import { Frame, Layout } from 'design/components';

// Hooks
import { useNow } from './use-now';

// Partials
import { Orb } from './orb';
import { Places } from './places';
import { Words } from './words';

// Utilities
import { toNearestHere, toNearestTo } from './nearest';
import { toBearing, toSubsolar } from './sun';

// Constants
import { CLASS_NAME, PARAM, PLACES, toPath, toSlug } from './constants';

/**
 * The Earth as an ink drawing, lit by where the sun is now. The address
 * names the place the globe faces. With no place, or one it does not know,
 * it goes to the place nearest the visitor.
 */
const Daylight: React.FunctionComponent = () => {
  const now = useNow();
  const navigate = useNavigate();
  const { [PARAM]: slug } = useParams();
  const active = PLACES.findIndex((place) => toSlug(place) === slug);

  if (active < 0) {
    return <Navigate replace to={toPath(toNearestHere(now))} />;
  }

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
            <Orb
              active={active}
              centre={PLACES[active]}
              date={now}
              /* Let go of the globe and it settles on the nearest place. */
              onDrop={(facing) => navigate(toPath(toNearestTo(facing)))}
              places={PLACES}
            />
            <Words bearing={toBearing(PLACES[active], toSubsolar(now))} />
            <Places active={active} date={now} />
          </article>
        </Layout>
      </Frame>
    </Layout>
  );
};

export { Daylight };
