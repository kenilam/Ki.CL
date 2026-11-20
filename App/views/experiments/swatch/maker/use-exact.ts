// Components
import { useWatch } from 'design/components';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

// Context
import { useMaker } from './context';

// The swatch on the page is already the picked color.
const useExact = () => {
  const { pick } = useMaker();
  const picked = useWatch({ control: pick.control, name: 'hex' });
  const hex = useCard()?.hex;

  return hex?.toLowerCase() === picked.toLowerCase();
};

export { useExact };
