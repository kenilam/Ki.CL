import { useTranslation } from 'design/hooks';

import {
  RECOGNITIONS,
  type Recognition,
} from '@/views/resume/page/article/sections/section/body/mentoring/recognitions/constants';

const useRecognition = (certificate: Recognition['certificate']) => {
  const translations = {
    common: useTranslation(),
    resume: useTranslation('resume'),
  };

  const position = RECOGNITIONS.findIndex((each) => {
    return each.certificate === certificate;
  });
  const { image, kind, month } = RECOGNITIONS[position];

  return {
    image: `${translations.common.t('url', { context: 'adplist_badges' })}/${image}`,
    period: new Intl.DateTimeFormat(translations.common.i18n.language, {
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${month}-15`)),
    position,
    title: translations.resume.t('recognition', { context: kind }),
    to: `${translations.common.t('url', { context: 'adplist_certificates' })}/${certificate}`,
  };
};

export { useRecognition };
