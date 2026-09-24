import React from 'react';

// Libraries
import classNames from 'classnames';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

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
import { useCooldown } from './use-cooldown';

// Constants
import { PARAM } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME } from './constants';

import './styles.scss';

const Chat: React.FunctionComponent = () => {
  const { [PARAM]: threadId = '' } = useParams();
  const seed = (useLocation().state as { thread?: Thread } | null)?.thread;

  const { accept, ...thread } = useThread(threadId, seed);
  const sender = useChat({ onSent: accept, threadId });
  const busy = Boolean(thread.thread) && thread.thread?.status !== 'IDLE';

  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const spent = data?.ImageAgentAllowance.remaining === 0;
  const cooling = useCooldown(data?.ImageAgentAllowance.nextAllowedAt);

  return (
    <>
      <Layout autoFlow='row' gap='none' justifyContent='stretch' frames='max-content--1fr'>
        <article
          className={classNames(
            CLASS_NAME,
            'kicl-inline-size-columns-8',
            'kicl-margin-inline-auto',
            'kicl-padding-block-start-header',
            'kicl-padding-inline-frame'
          )}
        >
          <Header />
          <Conversation
            {...thread}
            choosing={!busy && !cooling && !spent && !sender.loading}
            onChoose={sender.send}
            onRetry={sender.retry}
          />
        </article>
      </Layout>
      <Composer {...sender} busy={busy || cooling} spent={spent} />
    </>
  );
};

export { Chat };
