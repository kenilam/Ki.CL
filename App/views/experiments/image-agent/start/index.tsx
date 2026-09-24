import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, Layout } from '@/components';

// Partials
import { Composer } from '@/views/experiments/image-agent/composer';
import { Article } from './article';
import { Header } from './header';
import { Past } from './past';
import { Running } from './running';
import { Welcome } from './welcome';

// Hooks
import { useRunning } from './running/use-running';
import { useStart } from './use-start';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * `/experiments/image-agent`: the title, what to expect, any conversation still
 * running, the field, then past conversations filtered by what's typed. While
 * one is running, only that one is offered, because the API refuses new
 * messages until it ends. The article sits outside the field's section so the
 * field stops sticking before the article starts.
 */
const Start: React.FunctionComponent = () => {
  const sender = useStart();
  const running = useRunning();
  const [query, setQuery] = useState('');

  return (
    <Layout autoFlow='row' gap='normal' justifyContent='stretch'>
      <article
        className={classNames(
          CLASS_NAME,
          'kicl-padding-block-start-header',
          'kicl-padding-inline-widest'
        )}
      >
        <section className='kicl-margin-inline-auto'>
          <Header />
          <Layout autoFlow='row' gap='wide' justifyContent='stretch'>
            <section>
              <Welcome />
              <Running {...running} />
              {running.busy ? null : (
                <Card className='kicl-padding-block-end-wide' variant='ghost'>
                  <Composer
                    {...sender}
                    dense
                    onText={setQuery}
                    sticky={false}
                  />
                  <Past query={query} />
                </Card>
              )}
            </section>
          </Layout>
          <Article />
        </section>
      </article>
    </Layout>
  );
};

export { Start };
