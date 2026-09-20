import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Fa } from '@/Icons';

// Components
import { Button, Heading, HyperLink, Layout } from '@/Components';

// Constants
import { CLASS_NAME as VIEW } from './constants';

const CLASS_NAME = `${VIEW}__gate`;

const COPY = {
  play: 'Play',
};

type Props = {
  /** A line beneath the title: the station and the type, or a lede. */
  children?: React.ReactNode;
  /** Where the play control goes. */
  to?: string;
  /** What it does instead, when it is not a link. */
  onPlay?: () => void;
  title: string;
};

/**
 * A title and a play control, centred on the stage: what the view's index
 * shows, and what a track's route shows before it plays. The control is a
 * link when there is somewhere to go, so it has a real destination, and a
 * button when the browser is only waiting for a gesture.
 */
const Gate: React.FunctionComponent<Props> = ({
  children,
  onPlay,
  title,
  to,
}) => (
  <Layout
    alignContent='center'
    alignItems='center'
    autoFlow='row'
    gap='wide'
    justifyContent='center'
    justifyItems='center'
  >
    <section
      className={classNames(
        CLASS_NAME,
        'kicl-inset-0',
        'kicl-position-absolute',
        'kicl-text-align-center'
      )}
    >
      <Heading is='h1' dense className='kicl-font-size-huge'>
        {title}
      </Heading>
      {children}
      {to ? (
        <HyperLink
          aria-label={COPY.play}
          lookLikeButton
          to={to}
          variant='ghost'
        >
          <Fa.FaPlay aria-hidden />
        </HyperLink>
      ) : (
        <Button aria-label={COPY.play} onClick={onPlay} variant='ghost'>
          <Fa.FaPlay aria-hidden />
        </Button>
      )}
    </section>
  </Layout>
);

export { CLASS_NAME };
export default Gate;
