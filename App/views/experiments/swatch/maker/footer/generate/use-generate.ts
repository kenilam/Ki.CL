// API
import { Kicl_SwatchAllowanceDocument, useQuery } from 'api/client';

// Hooks
import { useExact } from '@/views/experiments/swatch/maker/use-exact';
import { useSpent } from '@/views/experiments/swatch/use-spent';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

const useGenerate = () => {
  const { busy, mode } = useMaker();
  const { data } = useQuery(Kicl_SwatchAllowanceDocument);
  const exact = useExact();
  const spent = useSpent();
  const making = busy || Boolean(data?.swatchAllowance.busy);

  return {
    busy: making,
    disabled: !making && (spent || (mode === 'pick' && exact)),
  };
};

export { useGenerate };
