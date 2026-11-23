import {
  Kicl_MentorshipDocument,
  useQuery,
  type Kicl_MentorshipQuery,
} from 'api/client';

import { useTranslation } from 'design/hooks';

type Quote = NonNullable<Kicl_MentorshipQuery['mentorship']>['quotes'][number];

const useQuote = (writtenAt: Quote['writtenAt']) => {
  const { t } = useTranslation('resume');
  const { data } = useQuery(Kicl_MentorshipDocument);

  const quotes = data?.mentorship?.quotes ?? [];
  const position = quotes.findIndex((each) => {
    return each.writtenAt === writtenAt;
  });
  const quote = quotes[position];

  if (!quote) {
    return null;
  }

  const { organisation, text, title } = quote;

  return {
    by:
      title && organisation
        ? t('quote_by', { organisation, title })
        : (title ?? organisation),
    position,
    text,
  };
};

export { useQuote, type Quote };
