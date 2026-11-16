import React from 'react';

import classNames from 'classnames';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PROFILES } from '@/views/about/resume/page/article/intro/links/contact/profiles/constants';

type Props = { context: (typeof PROFILES)[number] };

const Profile: React.FunctionComponent<Props> = ({ context }) => {
  const translations = {
    common: useTranslation(),
    resume: useTranslation('resume'),
  };

  return (
    <ListItem>
      <HyperLink
        className={classNames('kicl-font-family-mono', 'kicl-font-size-small')}
        to={translations.common.t('url', { context })}
      >
        <span className='kicl-print-hidden'>
          {translations.common.t(context)}
        </span>
        <span className='kicl-print-only'>
          {translations.resume.t(`profile.${context}`)}
        </span>
      </HyperLink>
    </ListItem>
  );
};

export { Profile };
