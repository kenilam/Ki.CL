import React, { useState } from 'react';

// Icons
import { Fa, Ri } from '@/icons';

// Components
import { HyperLink, Input, Layout, Spinner } from '@/components';

// Catalog
import type { Track } from '@/views/experiments/music-visualiser/catalog';

// Hooks
import type { Control } from '../../use-audio';

// Constants
import {
  CLASS_NAME as VIEW,
  toPlayPath,
  toTrackPath,
} from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome`;

const COPY = {
  copied: 'Link copied',
  copy: 'Copy link to this track',
  next: 'Next track',
  pause: 'Pause',
  volume: 'Volume',
};

/** How long "copied" stays on the link. */
const COPIED_MS = 1800;

type Props = {
  control: Control;
  next: Track | null;
  track: Track;
};

/**
 * Pause, skip, copy and volume. The first three are links: pause to the
 * track's gate, skip to the next track's `/play`, and copy to this track's
 * own address, which a press copies instead of following.
 */
const Controls: React.FunctionComponent<Props> = ({ control, next, track }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const url = new URL(toPlayPath(track), window.location.origin).href;

    void navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MS);
    });
  };

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      gap='narrow'
      justifyContent='end'
    >
      <div className={`${CLASS_NAME}__controls`}>
        <HyperLink
          aria-label={COPY.pause}
          lookLikeButton
          size='small'
          to={toTrackPath(track)}
          variant='secondary'
        >
          {control.loading ? (
            <Spinner position='inline' size='small' />
          ) : (
            <Fa.FaPause aria-hidden />
          )}
        </HyperLink>
        <HyperLink
          aria-label={COPY.next}
          disabled={!next}
          lookLikeButton
          size='small'
          to={toPlayPath(next ?? track)}
          variant='ghost'
        >
          <Ri.RiSkipForwardFill aria-hidden />
        </HyperLink>
        <HyperLink
          aria-label={copied ? COPY.copied : COPY.copy}
          lookLikeButton
          onClick={copyLink}
          size='small'
          title={copied ? COPY.copied : COPY.copy}
          to={toPlayPath(track)}
          variant='ghost'
        >
          <Fa.FaLink aria-hidden />
        </HyperLink>
        <Input
          aria-label={COPY.volume}
          className={`${CLASS_NAME}__volume`}
          max={1}
          min={0}
          onChange={(event) => control.setValue(Number(event.target.value))}
          step={0.01}
          type='range'
          value={control.value}
        />
      </div>
    </Layout>
  );
};

export { Controls };
