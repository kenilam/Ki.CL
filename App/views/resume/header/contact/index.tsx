import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { HyperLink, Text } from 'design/components';

// Constants
import { PHONE_KEY } from '@/views/resume/constants';

const SEPARATOR = ' · ';

const PROFILES = [
  { Icon: Ri.RiLinkedinBoxLine, context: 'linkedin' },
  { Icon: Ri.RiGithubLine, context: 'github' },
  { Icon: Ri.RiGlobalLine, context: 'experiments' },
] as const;

/** The phone number, on a machine that has been given one. See `PHONE_KEY`. */
const readPhone = () => {
  try {
    return window.localStorage.getItem(PHONE_KEY);
  } catch {
    // Storage can be blocked. The line is complete without the number.
    return null;
  }
};

/** Two lines, as on the printed page: where and how to write, then the profiles. */
const Contact: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { t: common } = useTranslation();

  const email = common('email');

  const phone = readPhone();

  return (
    <address className='kicl-font-style-normal'>
      <Text dense>
        {t('location')}
        <Text className='kicl-print-only' is='span'>
          {SEPARATOR}
        </Text>
        {/* The address is for paper. A screen opens the form. */}
        <HyperLink className='kicl-print-only' to={`mailto:${email}`}>
          {email}
        </HyperLink>
        {phone && `${SEPARATOR}${phone}`}
      </Text>
      <Text dense>
        {PROFILES.map(({ Icon, context }, index) => (
          <React.Fragment key={context}>
            {index > 0 ? SEPARATOR : null}
            <HyperLink
              before={<Icon aria-hidden />}
              className='kicl-text-nowrap'
              to={common('url', { context })}
            >
              {t(`profile.${context}`)}
            </HyperLink>
          </React.Fragment>
        ))}
      </Text>
    </address>
  );
};

export { Contact };
