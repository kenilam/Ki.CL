import React from 'react';

// Components
import type { SelectProps } from 'design/components';

// Partials
import { Provider } from './context';
import { Root } from './root';

type LanguageSelectProps = Pick<
  SelectProps,
  'className' | 'inline' | 'placement'
> & {
  onValueChange?: (acceptLanguage: string) => unknown;
  value?: string;
};

const LanguageSelect: React.FunctionComponent<LanguageSelectProps> = ({
  inline = true,
  value,
  ...rest
}) => {
  return (
    <Provider inline={inline} value={value}>
      <Root {...rest} />
    </Provider>
  );
};

export { LanguageSelect, type LanguageSelectProps };
