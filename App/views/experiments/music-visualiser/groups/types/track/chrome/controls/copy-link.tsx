import React, { useState } from 'react';

// Icons
import { Fa } from '@/icons';

// Components
import { HyperLink } from '@/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toPlayPath } from '@/views/experiments/music-visualiser/constants';

const COPY = {
  copied: 'Link copied',
  copy: 'Copy link to this track',
};

/** How long "copied" stays on the link. */
const COPIED_MS = 1800;

/** A link to this track's `/play`, which a press copies instead of following. */
const CopyLink: React.FunctionComponent = () => {
  const { track } = useTrackContext();
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
  );
};

export { CopyLink };
