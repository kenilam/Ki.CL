import { useState } from 'react';

// API
import { loadTranslations } from 'api/provider';

const usePreview = () => {
  const [value, setValue] = useState<string>();
  const [preview, setPreview] = useState<{
    contentLanguage: string;
    text: string;
  } | null>(null);

  const choose = async (acceptLanguage: string) => {
    setValue(acceptLanguage);

    const { contentLanguage, translations } = await loadTranslations(
      acceptLanguage,
      ['internationalisation']
    );
    const [translation] = translations;

    if (!translation) {
      return;
    }

    const { article } = translation.resources as {
      article: { switcher_preview: string };
    };

    setPreview({
      contentLanguage: contentLanguage.split(',')[0].trim(),
      text: article.switcher_preview,
    });
  };

  return { choose, preview, value };
};

export { usePreview };
