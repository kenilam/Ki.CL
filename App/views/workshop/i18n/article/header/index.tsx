import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { TITLE_ID } from '@/views/workshop/i18n/constants';

const Header: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    internationalisation: useTranslation('internationalisation'),
    workshop: useTranslation('workshop'),
  };

  return (
    <Layout gap='normal'>
      <header>
        <hgroup>
          <Heading className='kicl-font-size-huge' id={TITLE_ID}>
            {translations.common.t('internationalisation')}
          </Heading>
          <Text lookLike='h2'>
            {translations.internationalisation.t('full_name')}
          </Text>
        </hgroup>
        <Text>
          <HyperLink
            before={<Tb.TbBrandGithub aria-hidden />}
            lookLikeButton
            to={translations.common.t('url_api')}
            variant='secondary'
          >
            {translations.common.t('github')}
          </HyperLink>
        </Text>
        <Text className='kicl-max-inline-size-columns-8' lookLike='h3'>
          {translations.workshop.t('description', {
            context: 'internationalisation',
          })}
        </Text>
        <Text className='kicl-max-inline-size-columns-8'>
          {translations.internationalisation.t('article.intro')}
        </Text>
      </header>
    </Layout>
  );
};

export { Header };
