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

const Lighting: React.FunctionComponent = () => {
  const { t } = useTranslation('spatial-css');
  const ref = useSection<HTMLElement>('lighting');

  return (
    <Layout autoFlow='row' gap='normal'>
      <section
        className={classNames(
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-wider'
        )}
        ref={ref}
      >
        <Term id='lighting' />
        <Title id='lighting' />
        <Slot id='lighting' />
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.lighting.reflect')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.lighting.rule')}</Markdown>
        </Text>
        <CodeBlock className='kicl-scroll-reveal' language='css'>
          {SOURCE}
        </CodeBlock>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.lighting.switch')}</Markdown>
        </Text>
        <Text className='kicl-scroll-reveal' is='p'>
          <Markdown>{t('article.lighting.format')}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Lighting };
