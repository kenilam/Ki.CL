import React, { useEffect } from 'react';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import { Badge, BadgeLabel, type BadgeProps } from '@/components';

const COPY = {
  left: (remaining: number) => {
    if (!remaining) {
      return 'none left';
    }

    return `${remaining} image${remaining > 1 ? 's' : ''} left`;
  },
};

type Props = {
  /** The agent is replying. The count updates when it finishes. */
  busy: boolean;
};

/** Images left today, shown under the field. */
const Allowance: React.FunctionComponent<Props> = ({ busy }) => {
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

  let variant: BadgeProps['variant'] = 'positive';

  if (remaining <= limit / 2) {
    variant = 'warning';
  }

  if (remaining <= 1) {
    variant = 'destructive';
  }

  return (
    <Badge size='small' variant={variant}>
      <BadgeLabel>Allowance</BadgeLabel>
      {COPY.left(allowance.remaining)}
    </Badge>
  );
};

export { Allowance };
