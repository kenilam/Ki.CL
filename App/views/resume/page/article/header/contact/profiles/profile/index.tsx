import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { PROFILES } from '@/views/resume/page/article/header/contact/profiles/constants';

type Props = Pick<(typeof PROFILES)[number], 'context'>;

const Profile: React.FunctionComponent<Props> = ({ context }) => {
  const translations = {
    common: useTranslation(),
    resume: useTranslation('resume'),
  };
  const profile = PROFILES.find((each) => {
    return each.context === context;
  });

  if (!profile) {
    return null;
  }

  const { Icon } = profile;

  return (
    <HyperLink
      before={<Icon aria-hidden />}
      className='kicl-text-nowrap'
      to={translations.common.t('url', { context })}
    >
      {translations.resume.t(`profile.${context}`)}
    </HyperLink>
  );
};

export { Profile };
