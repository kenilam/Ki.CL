import React from 'react';

// API
import { Kicl_SwatchListDocument, useQuery } from 'api/client';

// Components
import { List } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useScroll } from './use-scroll';

// Partials
import { Swatch } from './swatch';

// Styles
import './styles.scss';

// Constants
import { SWATCHES } from '@/views/experiments/swatch/maker/make/pick/constants';

const Swatches: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const { data } = useQuery(Kicl_SwatchListDocument);
  const ref = useScroll();

  return (
    <List
      aria-label={t('label', { context: 'swatches' })}
      autoFlow='row'
      className={SWATCHES}
      display='flex'
      gap='narrower'
      ref={ref}
      wrap
    >
      {data?.swatchList.map(({ id }) => {
        return <Swatch id={id} key={id} />;
      })}
    </List>
  );
};

export { Swatches };
