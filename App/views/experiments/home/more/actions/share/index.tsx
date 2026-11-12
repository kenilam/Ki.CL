import React from 'react';

// Components
import { ListItem, ShareButton } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** Opens the system share sheet; where there is none, copies the address instead. */
const Share: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    experiments: useTranslation('experiments'),
  };

  return (
    <ListItem>
      <ShareButton
        copiedLabel={translations.common.t('status', { context: 'copied' })}
        label={translations.experiments.t('action', { context: 'share' })}
        showLabel
        value={() => {
          return window.location.href;
        }}
        variant='ghost'
      />
    </ListItem>
  );
};

export { Share };
