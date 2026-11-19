import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { CodeBlock, Layout, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSection } from '@/views/blog/spatial-css/use-section';

// Partials
import { Term } from '@/views/blog/spatial-css/article/term';
import { Slot } from '@/views/blog/spatial-css/article/slot';
import { Title } from '@/views/blog/spatial-css/article/title';

// Constants
import { SOURCE } from './constants';

const Draft: React.FunctionComponent = () => {
  const { t } = useTranslation('spatial-css');
  const ref = useSection<HTMLElement>('draft');

  return (
    <Layout autoFlow='row' gap='normal'>
      <section
        className={classNames(
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-wider'
        )}
        ref={ref}
      >
        <Term id='draft' />
        <Title id='draft' />
        <Slot id='draft' />
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.draft.scope')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.draft.not')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.draft.page')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.draft.example')}</Markdown>
        </Text>
        <CodeBlock className='kicl-scroll-reveal' language='css'>
          {SOURCE}
        </CodeBlock>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.draft.maps')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.draft.open')}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Draft };
