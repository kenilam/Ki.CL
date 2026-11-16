import React from 'react';

import classNames from 'classnames';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

const Site: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    resume: useTranslation('resume'),
  };

  return (
    <ListItem className='kicl-print-only'>
      <HyperLink
        className={classNames('kicl-font-family-mono', 'kicl-font-size-small')}
        to={translations.common.t('url', { context: 'site' })}
      >
        {translations.resume.t('profile.site')}
      </HyperLink>
    </ListItem>
  );
};

export { Site };
