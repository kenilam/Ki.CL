import React, { useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Navigate, useNavigate, useParams } from 'design/router';

// Components
import { Frame, Layout } from 'design/components';

// Hooks
import { useArrows } from './use-arrows';
import { useNow } from './use-now';

// Partials
import { Orb } from './orb';
import { Places } from './places';
import { Words } from './words';

// Utilities
import { toNearestHere, toNearestTo } from './nearest';
import { setGradient } from './words/gradient';

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

  const article = useRef<HTMLElement>(null);

  useArrows((place) => navigate(toPath(place)));

  if (active < 0) {
    return <Navigate replace to={toPath(toNearestHere(now))} />;
  }

  return (
    <Layout autoFlow='row' gap='none'>
      {/* The frame clips the drawing to the page. */}
      <Frame grow hold>
        {/* The words, then the places under them, at the top. */}
        <Layout alignContent='start' autoFlow='row' gap='narrow'>
          <article
            className={classNames(CLASS_NAME, 'kicl-position-relative')}
            ref={article}
          >
            <Orb
              active={active}
              centre={PLACES[active]}
              date={now}
              /* Let go of the globe and it settles on the nearest place. */
              onDrop={(facing) => {
                const place = toNearestTo(facing);

                navigate(toPath(place));

                return place;
              }}
              /* The title's colour follows the globe as it turns, not the place open. */
              onFace={(facing) =>
                article.current && setGradient(article.current, facing, now)
              }
              onPick={(place) => navigate(toPath(PLACES[place]))}
              places={PLACES}
            />
            <Words />
            <Places active={active} date={now} />
          </article>
        </Layout>
      </Frame>
    </Layout>
  );
};

export { Daylight };
