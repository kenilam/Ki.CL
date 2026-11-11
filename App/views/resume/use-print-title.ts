import { useEffect } from 'react';

// Hooks
import { useTranslation } from 'design/hooks';

/**
 * Names the document while it prints. A browser offers the title as the file
 * name when it saves a PDF, and the PDF keeps it as its own title. The usual
 * title, which is the route, goes back afterwards.
 */
const usePrintTitle = () => {
  const translations = {
    common: useTranslation(),
    resume: useTranslation('resume'),
  };

  const title = translations.resume.t('print_title', {
    name: translations.common.t('name'),
  });

  useEffect(() => {
    let usual = document.title;

    const name = () => {
      usual = document.title;
      document.title = title;
    };

    const restore = () => {
      document.title = usual;
    };

    window.addEventListener('beforeprint', name);
    window.addEventListener('afterprint', restore);

    return () => {
      window.removeEventListener('beforeprint', name);
      window.removeEventListener('afterprint', restore);
    };
  }, [title]);
};

export { usePrintTitle };
