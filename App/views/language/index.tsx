import React, { Suspense } from 'react';

// The switcher is Ki.CL-i18n's. Its remote is already loaded by the time a page renders, since `App/i18n` loads the words through it.
const LanguageSelect = React.lazy(async () => {
  const { LanguageSelect } = await import('i18n');

  return { default: LanguageSelect };
});

const Language: React.FunctionComponent<
  React.ComponentProps<typeof LanguageSelect>
> = (props) => {
  return (
    <Suspense fallback={null}>
      <LanguageSelect {...props} />
    </Suspense>
  );
};

export { Language };
