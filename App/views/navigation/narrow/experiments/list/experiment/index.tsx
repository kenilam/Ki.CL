import React from 'react';

// Components
import { Animation, HyperLink, ListItem } from 'design/components';

// Views
import { EXPERIMENTS } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

type Props = Pick<(typeof EXPERIMENTS)[number], 'to'>;

const Experiment: React.FunctionComponent<Props> = ({ to }) => {
  const { t } = useTranslation();
  const experiment = EXPERIMENTS.find((each) => {
    return each.to === to;
  });

  if (!experiment) {
    return null;
  }

  return (
    <Animation property='slide-from-top'>
      <ListItem>
        <HyperLink to={to}>
          {t('experiment', { context: experiment.context })}
        </HyperLink>
      </ListItem>
    </Animation>
  );
};

export { Experiment };
