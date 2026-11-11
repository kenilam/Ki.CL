import React, { useEffect } from 'react';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import {
  Animation,
  Badge,
  BadgeLabel,
  type BadgeProps,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useComposerContext } from '@/views/experiments/image-agent/composer';

/** Images left today, shown under the field. The count updates when a turn finishes. */
const Allowance: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { busy } = useComposerContext();

  const { data, refetch } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const allowance = data?.imageAgentAllowance;

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
