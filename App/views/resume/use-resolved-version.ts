import { useMemo } from 'react';

// Routes
import { useParams } from 'design/router';

// Content
import { findVersion, resolve } from './content';

// Hooks
import { useTranslation } from 'design/hooks';

const useResolvedVersion = () => {
  const { version: slug } = useParams();

  const translations = {
    common: useTranslation(),
    resume: useTranslation('resume'),
  };

  const found = findVersion(slug);

  return useMemo(() => {
    if (!found) {
      return undefined;
    }

    return resolve(
      found,
      // The default is what i18next shows anyway. Naming it tells the types
      // that a line need not have a wording for every version.
      (key, context) => {
        return translations.resume.t(key, { context, defaultValue: key });
      },
      (context) => {
        return translations.common.t('organisation', { context });
      }
    );
  }, [found, translations.common, translations.resume]);
};

export { useResolvedVersion };
