import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Card,
  CardFooter,
  Details,
  List,
  ListItem,
  Text,
} from 'design/components';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/conversation/message/constants';

// Spec
import type { Score } from '@/views/experiments/image-agent/chat/conversation/spec';

const CLASS_NAME = `${MESSAGE}__review`;

/** The criteria, in the order they are shown, out of ten. */
const ROWS = [
  { context: 'relevance', key: 'relevance' },
  { context: 'quality', key: 'quality' },
  { context: 'style', key: 'styleMatch' },
  { context: 'composition', key: 'composition' },
] as const satisfies ReadonlyArray<{ context: string; key: keyof Score }>;

type Props = {
  score: Score;
};

/** The vision model's score: one summary line, the breakdown in a disclosure. */
const Review: React.FunctionComponent<Props> = ({ score }) => {
  const { t } = useTranslation('image-agent');

  return (
    <Card className='kicl-contain-inline-size' is='section'>
      <Details
        className={CLASS_NAME}
        summary={t('scored', {
          context: score.pass ? 'pass' : 'fail',
          overall: score.overall,
        })}
      >
        <List gap='narrower' className='kicl-inline-size-md'>
          {ROWS.map((row) => (
            <ListItem
              autoFlow='column'
              display='grid'
              key={row.key}
              frames='auto--max-content'
            >
              <Text is='span'>{t('label', { context: row.context })}</Text>
              <Text
                dense
                is='span'
                className={classNames(
                  'kicl-font-family-mono',
                  'kicl-color-grey-700'
                )}
              >
                {String(score[row.key])}
              </Text>
            </ListItem>
          ))}
        </List>
        {score.suggestions.length ? (
          <CardFooter>
            <section>
              <Text is='p' dense>
                {t('title', { context: 'suggestions' })}
              </Text>
              <List gap='narrowest'>
                {score.suggestions.map((suggestion) => (
                  <ListItem key={suggestion}>
                    <Text is='span' className='kicl-color-grey-700'>
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
};

export { Review };
