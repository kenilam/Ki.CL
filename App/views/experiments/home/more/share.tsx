import React, { useState } from 'react';

// Components
import { Button } from '@/components';

// Icons
import { Ri } from '@/icons';

const COPY = {
  copied: 'Link copied',
  share: 'Share this page',
};

/** How long "copied" stays on the button. */
const COPIED_MS = 1800;

/** Opens the system share sheet; where there is none, copies the address instead. */
const Share: React.FunctionComponent = () => {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      // Rejects when the sheet is dismissed, which needs no handling.
      await navigator.share({ title: document.title, url }).catch(() => {});
      return;
    }

    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  const label = copied ? COPY.copied : COPY.share;

  return (
    <Button
      aria-label={label}
      onClick={() => void share()}
      title={label}
      variant='ghost'
    >
      <Ri.RiShareFill aria-hidden />
    </Button>
  );
};

export { Share };
