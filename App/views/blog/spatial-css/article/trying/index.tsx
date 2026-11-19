import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSection } from '@/views/blog/spatial-css/use-section';

// Partials
import { Term } from '@/views/blog/spatial-css/article/term';
import { Title } from '@/views/blog/spatial-css/article/title';
import { Steps } from './steps';

const Trying: React.FunctionComponent = () => {
  const { t } = useTranslation('spatial-css');
  const ref = useSection<HTMLElement>('trying');

  return (
    <Layout autoFlow='row' gap='normal'>
      <section
        className={classNames(
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-wider'
        )}
        ref={ref}
      >
        <Term id='trying' />
        <Title id='trying' />
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.trying.needs')}</Markdown>
        </Text>
        <Steps />
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.trying.page')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.trying.demo')}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Trying };
