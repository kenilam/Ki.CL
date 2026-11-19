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

const Model: React.FunctionComponent = () => {
  const { t } = useTranslation('spatial-css');
  const ref = useSection<HTMLElement>('model');

  return (
    <Layout autoFlow='row' gap='normal'>
      <section
        className={classNames(
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-wider'
        )}
        ref={ref}
      >
        <Term id='model' />
        <Title id='model' />
        <Slot id='model' />
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.model.element')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.model.behind')}</Markdown>
        </Text>
        <CodeBlock className='kicl-scroll-reveal' language='markup'>
          {SOURCE}
        </CodeBlock>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.model.attributes')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.model.alone')}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Model };
