// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import { useFormContext } from 'design/components';

// Context
import { useComposerContext } from '@/views/experiments/image-agent/composer/context';

// Schema
import type { ComposerValues } from '@/views/experiments/image-agent/composer/schema';

const useField = () => {
  const { control } = useFormContext<ComposerValues>();
  const { busy, loading, submit } = useComposerContext();

  // No allowance left, so sending is off until it comes back.
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const spent = data?.imageAgentAllowance.remaining === 0;

  return { control, disabled: busy || loading || spent, submit };
};

export { useField };
