// Hooks
import { useExact } from '@/views/experiments/swatch/maker/use-exact';
import { useSpent } from '@/views/experiments/swatch/use-spent';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

const useGenerate = () => {
  const { busy, mode } = useMaker();
  const exact = useExact();
  const spent = useSpent();

  return { busy, disabled: !busy && (spent || (mode === 'pick' && exact)) };
};

export { useGenerate };
