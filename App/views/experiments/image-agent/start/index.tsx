import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import { Frame, Layout } from '@/components';

// Partials
import { Backdrop } from '@/views/experiments/image-agent/backdrop';
import { Composer } from '@/views/experiments/image-agent/composer';
import { Allowance } from '@/views/experiments/image-agent/composer/allowance';
import { Article } from './article';
import { Header } from './header';
import { More } from './header/more';
import { Past } from './past';
import { Running } from './running';
import { Welcome } from './welcome';

// Hooks
import { useRunning } from './running/use-running';
import { useStart } from './use-start';

// Constants
import { CLASS_NAME } from './constants';

/**
 * `/experiments/image-agent`: a framed hero with the title, how it works, the
 * field and past conversations filtered by what's typed. While one is running, only that one
 * is offered, because the API refuses new messages until it ends. With no
 * allowance left there's no field, only past conversations. The article
 * follows.
 */
const Start: React.FunctionComponent = () => {
  const sender = useStart();
  const running = useRunning();
  const [query, setQuery] = useState('');

  // Shares the allowance badge's cached query.
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const spent = data?.ImageAgentAllowance.remaining === 0;

  return (
    <Layout autoFlow='row' gap='none' justifyContent='stretch'>
      <article className={CLASS_NAME}>
        <Frame grow hold>
          <Layout alignContent='center' autoFlow='row' justifyContent='stretch'>
            <section
              className={classNames(
                // Dark in both themes, so the scrim darkens the pictures.
                'kicl--theme--dark',
                'kicl-padding-block-widest',
                'kicl-padding-inline-frame',
                'kicl-position-relative'
              )}
            >
              <Backdrop scrim />
              <div
                className={classNames(
                  'kicl-inline-size-columns-12',
                  'kicl-margin-inline-auto',
                  'kicl-position-relative'
                )}
              >
                <div className='kicl-inline-size-columns-8'>
                  <Header />
                  <Welcome />
                  <Running {...running} />
                  {/* The badge is part of the field; without the field it stands alone. */}
                  {running.busy || spent ? (
                    <Allowance busy={running.busy} />
                  ) : (
                    <Composer
                      {...sender}
                      dense
                      onText={setQuery}
                      sticky={false}
                    />
                  )}
                  {running.busy ? null : <Past query={query} />}
                </div>
              </div>
              <More />
            </section>
          </Layout>
        </Frame>
        <Article />
      </article>
    </Layout>
  );
};

export { Start };
