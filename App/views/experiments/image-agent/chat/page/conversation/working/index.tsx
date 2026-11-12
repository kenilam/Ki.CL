import React from 'react';

// Components
import { Layout, Spinner } from 'design/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CONVERSATION } from '@/views/experiments/image-agent/chat/page/conversation/constants';

const CLASS_NAME = `${CONVERSATION}__working__spinner`;

/**
 * Shown while the agent is working, spaced like a `Status` icon. It sits in a
 * box one line tall so it stays centred on the first line when the text wraps.
 */
const Working: React.FunctionComponent = () => {
  return (
    <Layout alignItems='center' display='inline-grid'>
      <span className={CLASS_NAME}>
        <Spinner in position='inline' size='small' />
      </span>
    </Layout>
  );
};

export { Working };
