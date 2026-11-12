import React, { createContext, useContext } from 'react';

// Spec
import type { LanguageSelectProps } from '@/views/language-select';

// Partials
import { useOptions } from './use-options';

type LanguageSelect = Pick<LanguageSelectProps, 'value'> & {
  busy: boolean;
  inline: boolean;
  options: ReturnType<typeof useOptions>['options'];
};

const LanguageSelectContext = createContext<LanguageSelect | null>(null);

type Props = React.PropsWithChildren<
  Pick<LanguageSelectProps, 'value'> & { inline: boolean }
>;

const Provider: React.FunctionComponent<Props> = ({
  children,
  inline,
  value,
}) => {
  const { busy, options } = useOptions(value);

  return (
    <LanguageSelectContext.Provider value={{ busy, inline, options, value }}>
      {children}
    </LanguageSelectContext.Provider>
  );
};

const useLanguageSelect = () => {
  const languageSelect = useContext(LanguageSelectContext);

  if (!languageSelect) {
    throw new Error('useLanguageSelect needs a LanguageSelect around it.');
  }

  return languageSelect;
};

export { Provider, useLanguageSelect };
