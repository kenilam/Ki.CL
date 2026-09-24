import React from 'react';

// Components
import {
  AnimatedText,
  BubbleContent,
  Layout,
  Spinner,
  Text,
} from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/conversation/message/constants';

const CLASS_NAME = `${MESSAGE}__text`;

type Props = {
  busy: boolean;
  /** Animate the text in word by word. */
  reveal: boolean;
  text: string;
};

/**
 * The text of a turn, with a spinner while the agent is working. Spaced like a
 * `Status` icon and title, so progress and failures look the same. The spinner
 * sits in a box one line tall so it stays centred on the first line when the
 * text wraps.
 */
const MessageText: React.FunctionComponent<Props> = ({
  busy,
  reveal,
  text,
}) => (
  <Layout
    alignItems='start'
    autoFlow='column'
    gap='narrow'
    justifyContent='start'
  >
    <BubbleContent>
      {busy ? (
        <Layout alignItems='center' display='inline-grid'>
          <span className={`${CLASS_NAME}__spinner`}>
            <Spinner in position='inline' size='small' />
          </span>
        </Layout>
      ) : null}
      {reveal ? (
        <AnimatedText
          is='span'
          key={text}
          property='blur'
          split='word'
          stagger={40}
        >
          {text}
        </AnimatedText>
      ) : (
        <Text is='span'>{text}</Text>
      )}
    </BubbleContent>
  </Layout>
);

export { MessageText };
