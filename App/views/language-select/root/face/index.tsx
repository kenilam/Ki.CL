import React from 'react';

// Components
import { SelectValue } from 'design/components';

// Context
import { useLanguageSelect } from '@/views/language-select/context';

// Partials
import { flagOf } from '@/views/language-select/root/flag-of';

/** Inline, the trigger shows only the flag, or the name's first letter when there is none. */
const Face: React.FunctionComponent = () => {
  const { inline, options, value } = useLanguageSelect();

  if (!inline) {
    return <SelectValue />;
  }

  const current = options.find(({ acceptLanguage }) => {
    return acceptLanguage === value;
  });

  if (!current) {
    return null;
  }

  return flagOf(current.acceptLanguage) || [...current.name][0];
};

export { Face };
