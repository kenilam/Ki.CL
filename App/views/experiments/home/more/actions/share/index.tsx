import React from 'react';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useClipboard, useTranslation } from 'design/hooks';

// Icons
import * as Tb from 'react-icons/tb';

/** Opens the system share sheet; where there is none, copies the address instead. */
const Share: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    experiments: useTranslation('experiments'),
  };
  const { copied, copy } = useClipboard();

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

    await copy(url);
  };

  const label = copied
    ? translations.common.t('status', { context: 'copied' })
    : translations.experiments.t('action', { context: 'share' });

  return (
    <ListItem>
      <Button
        before={<Tb.TbShare aria-hidden />}
        onClick={() => void share()}
        variant='ghost'
      >
        {label}
      </Button>
    </ListItem>
  );
};

export { Share };
