import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Intro } from './intro';
import { Keeping } from './keeping';
import { Notes } from './notes';
import { Steps } from './steps';

// Constants
import { ARTICLE_ID } from '@/views/experiments/swatch/card/constants';

const Article: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const id = useId();

  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section
        aria-labelledby={id}
        className={classNames(
          'kicl-inline-size-columns-12',
          'kicl-margin-inline-auto',
          'kicl-padding-block-frame',
          'kicl-padding-inline-frame'
        )}
        id={ARTICLE_ID}
      >
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'how_it_was_made' })}
        </Heading>
        <Intro />
        <Steps />
        <Notes />
        <Keeping />
      </section>
    </Layout>
  );
};

export { Article };
