import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Button, HyperLink, Navigation } from 'design/components';

// Views
import { CONTACT_ID } from '@/views/contact/constants';

const Aside: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { t: common } = useTranslation();

  return (
    <Navigation
      aria-label={t('header.aside.label')}
      alignContent='center'
      alignItems='center'
      autoFlow='column'
      className={classNames(
        'kicl-font-size-medium',
        'kicl-padding-block-start-wide',
        'kicl-z-index-raised'
      )}
      justifyContent='center'
      justifyItems='center'
    >
      <HyperLink
        aria-label={t('header.aside.linkedin')}
        lookLikeButton
        size='small'
        title={t('header.aside.linkedin')}
        to={common('url', { context: 'linkedin' })}
        variant='ghost'
      >
        <Ri.RiLinkedinLine aria-hidden />
      </HyperLink>
      <HyperLink
        aria-label={t('header.aside.github')}
        lookLikeButton
        size='small'
        title={t('header.aside.github')}
        to={common('url', { context: 'github' })}
        variant='ghost'
      >
        <Ri.RiGithubLine aria-hidden />
      </HyperLink>
      <Button
        aria-label={common('send_message')}
        command='show-modal'
        commandfor={CONTACT_ID}
        size='small'
        title={common('send_message')}
        variant='ghost'
      >
        <Ri.RiMailLine aria-hidden />
      </Button>
    </Navigation>
  );
};

export { Aside };
