import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResponsive } from 'design/hooks';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Partials
import { Full } from './full';
import { Open } from './open';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * A square preview; pressing it opens the whole picture in a dialog, headed
 * with the conversation's title.
 */
const Picture: React.FunctionComponent = () => {
  const { message } = useMessageContext();
  const { isNarrow } = useResponsive();

  if (!message.asset?.url) {
    return null;
  }

  return (
    <figure
      className={classNames(CLASS_NAME, {
        [`${CLASS_NAME}--narrow`]: isNarrow,
      })}
    >
      <Open />
      <Full />
    </figure>
  );
};

export { Picture };
