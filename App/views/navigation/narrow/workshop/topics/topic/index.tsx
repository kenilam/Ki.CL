import React from 'react';

// Components
import { Animation, HyperLink, ListItem } from 'design/components';

// Views
import { TOPICS } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

type Props = Pick<(typeof TOPICS)[number], 'to'>;

const Topic: React.FunctionComponent<Props> = ({ to }) => {
  const { t } = useTranslation();
  const topic = TOPICS.find((each) => {
    return each.to === to;
  });

  if (!topic) {
    return null;
  }

  return (
    <Animation property='slide-from-top'>
      <ListItem>
        <HyperLink to={to}>{t(topic.context)}</HyperLink>
      </ListItem>
    </Animation>
  );
};

export { Topic };
