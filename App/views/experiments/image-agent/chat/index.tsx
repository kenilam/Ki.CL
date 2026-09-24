import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { useLocation, useParams } from '@/router';

// Components
import { Layout } from '@/components';

// Partials
import { Composer } from '@/views/experiments/image-agent/composer';
import { Conversation } from './conversation';
import { Header } from './header';
import type { Thread } from './conversation/spec';

// Hooks
import { useThread } from './conversation/use-thread';
import { useChat } from './use-chat';

// Styles
import './styles.scss';

// Constants
import { PARAM } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME } from './constants';

/** `/experiments/image-agent/:threadId`: one conversation and the field. */
const Chat: React.FunctionComponent = () => {
  const { [PARAM]: threadId = '' } = useParams();
  const seed = (useLocation().state as { thread?: Thread } | null)?.thread;

  const { accept, ...thread } = useThread(threadId, seed);
  const sender = useChat({ onSent: accept, threadId });
  const busy = Boolean(thread.thread) && thread.thread?.status !== 'IDLE';

  return (
    <>
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
            <Conversation
              {...thread}
              choosing={!busy && !sender.loading}
              onChoose={sender.send}
              onRetry={sender.retry}
            />
          </section>
        </article>
      </Layout>
      <Composer {...sender} busy={busy} />
    </>
  );
};

export { Chat };
