import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Constants
import { TOPICS } from '@/views/routes';

type Props = Pick<(typeof TOPICS)[number], 'to'>;

const Picture: React.FunctionComponent<Props> = ({ to }) => {
  const topic = TOPICS.find((each) => {
    return each.to === to;
  });

  if (!topic) {
    return null;
  }

  const [Top, Left, Right] = topic.icons;

  return (
    <Layout
      alignContent='center'
      gap='narrow'
      justifyContent='center'
      justifyItems='center'
    >
      <div
        aria-hidden
        className={classNames(
          'kicl-aspect-ratio-video',
          'kicl-background-color-black-pure',
          'kicl-border-radius-sm',
          'kicl-color-white',
          'kicl-font-size-larger',
          'kicl-inline-size-full'
        )}
      >
        <Top />
        <Layout autoFlow='column' gap='narrow'>
          <span>
            <Left />
            <Right />
          </span>
        </Layout>
      </div>
    </Layout>
  );
};

export { Picture };
