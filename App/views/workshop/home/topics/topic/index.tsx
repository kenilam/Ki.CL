import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  HyperLink,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Picture } from './picture';

// Constants
import { TOPICS } from '@/views/routes';

type Props = Pick<(typeof TOPICS)[number], 'to'>;

/** A topic's card: its icons in a triangle, its name and what it covers. */
const Topic: React.FunctionComponent<Props> = ({ to }) => {
  const translations = {
    common: useTranslation(),
    workshop: useTranslation('workshop'),
  };
  const topic = TOPICS.find((each) => {
    return each.to === to;
  });

  if (!topic) {
    return null;
  }

  const { context } = topic;

  return (
    // A row of the list each for its picture, title and description, shared
    // with the card beside it.
    <Card
      className={classNames(
        'kicl-grid-row-span-3',
        'kicl-grid-template-rows-subgrid'
      )}
      is='li'
    >
      <Picture to={to} />
      <CardHeader
        className={classNames(
          'kicl-grid-row-span-2',
          'kicl-grid-template-rows-subgrid'
        )}
      >
        <CardTitle is='h2'>
          <HyperLink to={to}>{translations.common.t(context)}</HyperLink>
        </CardTitle>
        <CardDescription>
          {translations.workshop.t('description', { context })}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export { Topic };
