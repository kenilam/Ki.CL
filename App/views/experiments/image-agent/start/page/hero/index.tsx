import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Backdrop } from '@/views/experiments/image-agent/backdrop';
import { Ask } from './ask';
import { Header } from './header';
import { More } from './more';
import { Past } from './past';
import { Running } from './running';

// Context
import { useComposerContext } from '@/views/experiments/image-agent/composer';

/**
 * The title, how it works, the field and past conversations filtered by
 * what's typed. While one is running, only that one is offered, because the
 * API refuses new messages until it ends. With no allowance left there's no
 * field, only past conversations.
 */
const Hero: React.FunctionComponent = () => {
  const { busy } = useComposerContext();

  return (
    <Frame grow>
      <Layout alignContent='end' autoFlow='row' justifyContent='stretch'>
        <section
          className={classNames(
            // Dark in both themes, so the scrim darkens the picture.
            'kicl--theme--dark',
            'kicl-padding-block-frame',
            'kicl-padding-inline-frame',
            'kicl-position-relative'
          )}
        >
          <Backdrop />
          {/*
            Positioned so it paints over the backdrop. The frame's own
            padding can't also cap the content at 12 columns, so this
            element does.
          */}
          <Layout gap='wide'>
            <div
              className={classNames(
                'kicl-inline-size-columns-12',
                'kicl-margin-inline-auto',
                'kicl-position-relative'
              )}
            >
              <Header />
              <Running />
              {busy ? null : <Past />}
              <Ask />
              <More />
            </div>
          </Layout>
        </section>
      </Layout>
    </Frame>
  );
};

export { Hero };
