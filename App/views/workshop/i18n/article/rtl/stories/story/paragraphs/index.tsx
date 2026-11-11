import React from 'react';

// Partials
import { Paragraph } from './paragraph';

// Constants
import { STORIES } from '@/views/workshop/i18n/article/rtl/stories/constants';

type Props = Pick<(typeof STORIES)[number], 'context'>;

const Paragraphs: React.FunctionComponent<Props> = ({ context }) => {
  const story = STORIES.find((each) => {
    return each.context === context;
  });

  if (!story) {
    return null;
  }

  return (
    <>
      {story.paragraphs.map(
        (paragraph: (typeof STORIES)[number]['paragraphs'][number]) => {
          return <Paragraph paragraph={paragraph} key={paragraph} />;
        }
      )}
    </>
  );
};

export { Paragraphs };
