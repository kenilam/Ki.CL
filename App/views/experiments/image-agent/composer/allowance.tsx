import React, { useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import {
  Animation,
  Badge,
  BadgeLabel,
  type BadgeProps,
} from 'design/components';

type Props = {
  /** The agent is replying. The count updates when it finishes. */
  busy: boolean;
};

/** Images left today, shown under the field. */
const Allowance: React.FunctionComponent<Props> = ({ busy }) => {
  const { t } = useTranslation('image-agent');

  const { data, refetch } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const allowance = data?.ImageAgentAllowance;

  useEffect(() => {
    if (!busy) {
      void refetch();
    }
  }, [busy, refetch]);

  if (!allowance) {
    return null;
  }

  const { remaining, limit } = allowance;

  let level: BadgeProps['level'] = 'confirm';

  if (remaining <= limit / 2) {
    level = 'warning';
  }

  if (remaining <= 1) {
    level = 'error';
  }

  return (
    <Animation>
      <Badge level={level} size='small'>
        <BadgeLabel>{t('label', { context: 'allowance' })}</BadgeLabel>
        {t('images_left', { count: remaining })}
      </Badge>
    </Animation>
  );
};

export { Allowance };
