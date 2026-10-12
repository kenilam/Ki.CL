import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Button } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

/** How long "copied" stays on the button. */
const COPIED_MS = 1800;

/** Opens the system share sheet; where there is none, copies the address instead. */
const Share: React.FunctionComponent = () => {
  const { t } = useTranslation('experiments');
  const { t: common } = useTranslation();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch {
        // Rejects when the sheet is dismissed, which needs no handling.
      }

      return;
    }

    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  const label = copied
    ? common('status', { context: 'copied' })
    : t('action', { context: 'share' });

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
