import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Tb from 'react-icons/tb';

// Routes
import { useParams } from 'design/router';

// Components
import { HyperLink, ListItem } from 'design/components';

// Context
import { useSongsContext } from '@/views/experiments/kinetic-light/context';

// Constants
import { PARAM, toPath } from '@/views/experiments/kinetic-light/constants';

type Props = Pick<
  ReturnType<typeof useSongsContext>['songs'][number],
  'id'
>;

const Item: React.FunctionComponent<Props> = ({ id: songId }) => {
  const { id } = useParams<typeof PARAM>();
  const { examples, songs } = useSongsContext();
  const song = [...songs, ...examples].find((each) => {
    return each.id === songId;
  });

  if (!song) {
    return null;
  }

  return (
    <ListItem>
      <HyperLink
        after={
          <Tb.TbCheck
            aria-hidden
            className={classNames({
              'kicl-hidden': id !== song.id,
            })}
          />
        }
        before={<Tb.TbMusic aria-hidden />}
        className='kicl-inline-size-full'
        frames='max-content--auto--max-content'
        justifyContent='stretch'
        lookLikeButton
        to={toPath(song.id)}
        variant='tertiary'
      >
        <span className='kicl-text-truncate' title={song.title}>
          {song.title}
        </span>
      </HyperLink>
    </ListItem>
  );
};

export { Item };
