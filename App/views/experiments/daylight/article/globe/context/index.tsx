import React, { PropsWithChildren } from 'react';

// Routes
import { useNavigate } from 'design/router';

// Context
import { useDaylightContext } from '@/views/experiments/daylight/context';

// Partials
import { Provider as Orb } from '@/views/experiments/daylight/orb';

// Utilities
import { toNearestTo } from '@/views/experiments/daylight/nearest';
import { setGradient } from '@/views/experiments/daylight/article/globe/gradient';

// Constants
import { PLACES, toPath } from '@/views/experiments/daylight/constants';

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { active, article, now } = useDaylightContext();
  const navigate = useNavigate();

  return (
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
    >
      {children}
    </Orb>
  );
};

export { Provider };
