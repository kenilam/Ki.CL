import React from 'react';

// API
import { Kicl_SwatchListDocument, useQuery } from 'api/provider';

// Components
import { HyperLink, Image, ListItem } from 'design/components';

// Routes
import { useParams } from 'design/router';

// Hooks
import { useChoose } from './use-choose';

// Partials
import { Current } from './current';

// Styles
import './styles.scss';

// Constants
import { PARAM, toPath } from '@/views/experiments/swatch/constants';
import { CLASS_NAME as MAKER } from '@/views/experiments/swatch/maker/constants';

const CLASS_NAME = `${MAKER}__swatch`;

type Props = { id: string };

const Swatch: React.FunctionComponent<Props> = ({ id }) => {
  const { [PARAM]: current } = useParams();
  const choose = useChoose();
  const { data } = useQuery(Kicl_SwatchListDocument);
  const swatch = data?.swatchList.find((match) => {
    return match.id === id;
  });

  if (!swatch?.hex || !swatch.name || !swatch.still) {
    return null;
  }

  const hex = swatch.hex.toLowerCase();

  return (
    <ListItem>
      <HyperLink
        after={id === current ? <Current /> : null}
        before={
          <Image
            alt=''
            className={CLASS_NAME}
            data={swatch.still}
            loading='lazy'
          />
        }
        display={false}
        lookLikeButton
        onClick={() => {
          choose(hex);
        }}
        replace
        size='small'
        to={toPath(id)}
        variant='secondary'
        viewTransition={false}
      >
        {swatch.name}
      </HyperLink>
    </ListItem>
  );
};

export { Swatch };
