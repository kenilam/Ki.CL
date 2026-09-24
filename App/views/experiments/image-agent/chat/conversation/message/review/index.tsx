import React from 'react';

// Components
import { Card, CardFooter, Details, List, ListItem, Text } from '@/components';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/conversation/message/constants';

// Spec
import type { Score } from '@/views/experiments/image-agent/chat/conversation/spec';

const CLASS_NAME = `${MESSAGE}__review`;

const COPY = {
  fail: 'failed',
  pass: 'passed',
  suggestions: 'Reviewer’s suggestions',
  summary: (score: Score) =>
    `Scored ${score.overall}/10, ${score.pass ? COPY.pass : COPY.fail}`,
};

/** The criteria, in the order they are shown, out of ten. */
const ROWS: ReadonlyArray<{ key: keyof Score & string; label: string }> = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'quality', label: 'Quality' },
  { key: 'styleMatch', label: 'Style' },
  { key: 'composition', label: 'Composition' },
];

type Props = {
  score: Score;
};

/** The vision model's score: one summary line, the breakdown in a disclosure. */
const Review: React.FunctionComponent<Props> = ({ score }) => (
  <Card className='kicl-contain-inline-size'>
    <Details className={CLASS_NAME} summary={COPY.summary(score)}>
      <List gap='narrower' className='kicl-inline-size-md'>
        {ROWS.map((row) => (
          <ListItem
            autoFlow='column'
            display='grid'
            key={row.key}
            frames='auto--max-content'
          >
            <Text is='span' className='kicl-font-size-small'>
              {row.label}
            </Text>
            <Text
              dense
              is='span'
              className='kicl-font-family-mono kicl-font-size-small kicl-color-grey-dark'
            >
              {String(score[row.key])}
            </Text>
          </ListItem>
        ))}
      </List>
      {score.suggestions.length ? (
        <CardFooter>
          <section>
            <Text is='p' dense className='kicl-font-size-small'>
              {COPY.suggestions}
            </Text>
            <List gap='narrowest'>
              {score.suggestions.map((suggestion) => (
                <ListItem key={suggestion}>
                  <Text
                    is='span'
                    className='kicl-font-size-small kicl-color-grey-dark'
                  >
                    {suggestion}
                  </Text>
                </ListItem>
              ))}
            </List>
          </section>
        </CardFooter>
      ) : null}
    </Details>
  </Card>
);

export { Review };
