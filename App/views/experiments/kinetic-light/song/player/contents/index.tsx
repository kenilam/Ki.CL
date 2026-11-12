import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout, Spinner } from 'design/components';

// Context
import {
  usePieceContext,
  useSongContext,
} from '@/views/experiments/kinetic-light/song/context';

// Partials
import { Chrome } from '@/views/experiments/kinetic-light/song/player/chrome';
import { Fallback } from '@/views/experiments/kinetic-light/song/player/fallback';
import { Prompt } from '@/views/experiments/kinetic-light/song/player/prompt';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player`;

const Contents: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { loading } = useSongContext();
  const { playable } = usePieceContext();

  if (!loading && !playable) {
    return <Fallback />;
  }

  return (
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
              <Prompt />
              <Chrome />
            </>
          ) : null}
          {loading ? <Spinner backdrop /> : null}
        </article>
      </Frame>
    </Layout>
  );
};

export { Contents };
