import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Select, SelectTrigger } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useLanguageSelect } from '@/views/language-select/context';

// Spec
import type { LanguageSelectProps } from '@/views/language-select';

// Partials
import { Face } from './face';
import { Options } from './options';

// Constants
import { CLASS_NAME } from '@/views/language-select/constants';

type Props = Omit<LanguageSelectProps, 'inline' | 'value'>;

const Root: React.FunctionComponent<Props> = ({
  className,
  onValueChange,
  placement,
}) => {
  const { t } = useTranslation();
  const { busy, inline, options, value } = useLanguageSelect();
  const [loading, setLoading] = useState(false);

  return (
    <Select
      aria-busy={busy || loading}
      aria-label={t('label', { context: 'language' })}
      className={classNames(CLASS_NAME, className)}
      disabled={busy}
      inline={inline}
      placement={placement}
      onValueChange={(picked) => {
        const option = options.find(({ acceptLanguage }) => {
          return acceptLanguage === picked;
        });

        if (!option || loading) {
          return;
        }

        setLoading(true);

        // A promise keeps the spinner up until the change has loaded.
        void Promise.resolve(onValueChange?.(option.acceptLanguage)).finally(
          () => {
            setLoading(false);
          }
        );
      }}
      value={value}
    >
      <SelectTrigger>
        <Face />
      </SelectTrigger>
      <Options />
    </Select>
  );
};

export { Root };
