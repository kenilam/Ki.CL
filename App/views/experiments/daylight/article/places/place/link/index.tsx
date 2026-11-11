import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useDaylightContext } from '@/views/experiments/daylight/context';

// Constants
import { PLACES, toPath } from '@/views/experiments/daylight/constants';

type Props = Pick<(typeof PLACES)[number], 'context'>;

const Link: React.FunctionComponent<Props> = ({ context }) => {
  const { active } = useDaylightContext();
  const { t } = useTranslation('daylight');
  const place = PLACES.find((each) => {
    return each.context === context;
  });

  if (!place) {
    return null;
  }

  const current = PLACES[active].context === context;

  return (
    <HyperLink
      aria-current={current ? 'page' : undefined}
      className='kicl-inline-size-full'
      to={toPath(place)}
      lookLikeButton
      size='small'
      variant={current ? 'ghost' : 'secondary'}
    >
      {t('place', { context: place.context })}
    </HyperLink>
  );
};

export { Link };
