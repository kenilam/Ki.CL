// Hooks
import { useResponsive } from 'design/hooks';

// Helpers
import { closeMaker } from '@/views/experiments/swatch/maker/close';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

const useChoose = () => {
  const { pick } = useMaker();
  const { isNarrow } = useResponsive();

  return (hex: string) => {
    pick.reset({ hex }, { keepDirtyValues: false });

    if (isNarrow) {
      closeMaker();
    }
  };
};

export { useChoose };
