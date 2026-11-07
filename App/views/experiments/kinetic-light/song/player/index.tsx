import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout, Spinner } from 'design/components';

// Context
import { PlayerContext, usePlayer } from './context';

// Partials
import { Chrome } from './chrome';
import { Fallback } from './fallback';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player`;

const Player: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = usePlayer();
  const { loading, playable } = value;

  return (
    <PlayerContext.Provider value={value}>
      {!loading && !playable ? (
        <Fallback />
      ) : (
        <Layout autoFlow='row' gap='none'>
          <Frame>
            <article
              className={classNames(
                CLASS_NAME,
                'kicl--theme--dark',
                'kicl-position-relative'
              )}
            >
              {playable ? (
                <>
                  {children}
                  <Chrome />
                </>
              ) : null}
              {loading ? <Spinner backdrop /> : null}
            </article>
          </Frame>
        </Layout>
      )}
    </PlayerContext.Provider>
  );
};

export { Player };
