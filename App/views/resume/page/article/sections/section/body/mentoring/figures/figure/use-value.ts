import { Kicl_MentorshipDocument, useQuery } from 'api/client';

import { useTranslation } from 'design/hooks';

import type { Figure } from '@/views/resume/page/article/sections/section/body/mentoring/figures/constants';

const useValue = (id: Figure) => {
  const translations = {
    common: useTranslation(),
    resume: useTranslation('resume'),
  };
  const { data } = useQuery(Kicl_MentorshipDocument);

  const reviews = data?.mentorship?.reviews;
  const number = new Intl.NumberFormat(translations.common.i18n.language, {
    maximumFractionDigits: 1,
  });

  const values = {
    minutes: translations.common.t('mentoring_minutes'),
    rank: translations.resume.t('rank'),
    rating: reviews ? number.format(reviews.average) : null,
    reviews: reviews ? number.format(reviews.count) : null,
    sessions: translations.common.t('mentoring_sessions'),
  };

  return values[id];
};

export { useValue };
