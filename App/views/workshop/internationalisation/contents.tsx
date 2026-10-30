import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Partials
import { How } from './article/how';
import { Implementation } from './article/implementation';
import { Limits } from './article/limits';
import { Why } from './article/why';
import { Wrong } from './article/wrong';

// Constants
import { CLASS_NAME } from './constants';

const Contents: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');
  const { t: common } = useTranslation();
  const { t: workshop } = useTranslation('workshop');
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
            <Heading className='kicl-font-size-huge' id={id}>
              {common('internationalisation')}
            </Heading>
            <Text>
              <HyperLink
                before={<Ri.RiGithubLine aria-hidden />}
                lookLikeButton
                to={common('url_api')}
                variant='secondary'
              >
                {common('github')}
              </HyperLink>
            </Text>
            <Text className='kicl-max-inline-size-columns-8' lookLike='h3'>
              {workshop('description', { context: 'internationalisation' })}
            </Text>
            <Text className='kicl-max-inline-size-columns-8'>
              {t('article.intro')}
            </Text>
          </header>
        </Layout>
        <Why />
        <How />
        <Implementation />
        <Wrong />
        <Limits />
      </article>
    </Layout>
  );
};

export { Contents };
