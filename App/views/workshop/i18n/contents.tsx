import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Partials
import { Availability } from './article/availability';
import { How } from './article/how';
import { Implementation } from './article/implementation';
import { Limits } from './article/limits';
import { Negotiation } from './article/negotiation';
import { Rtl } from './article/rtl';
import { Serving } from './article/serving';
import { Switcher } from './article/switcher';
import { Translating } from './article/translating';
import { Why } from './article/why';
import { Wrong } from './article/wrong';

// Constants
import { CLASS_NAME } from './constants';

const Contents: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    internationalisation: useTranslation('internationalisation'),
    workshop: useTranslation('workshop'),
  };
  const id = useId();

  return (
    <Layout gap='wider'>
      <article
        aria-labelledby={id}
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-full',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12'
        )}
      >
        <Layout gap='normal'>
          <header>
            <hgroup>
              <Heading className='kicl-font-size-huge' id={id}>
                {translations.common.t('internationalisation')}
              </Heading>
              <Text lookLike='h2'>
                {translations.internationalisation.t('full_name')}
              </Text>
            </hgroup>
            <Text>
              <HyperLink
                before={<Bs.BsGithub aria-hidden />}
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
        <Switcher />
        <Why />
        <How />
        <Negotiation />
        <Serving />
        <Translating />
        <Availability />
        <Rtl />
        <Implementation />
        <Wrong />
        <Limits />
      </article>
    </Layout>
  );
};

export { Contents };
