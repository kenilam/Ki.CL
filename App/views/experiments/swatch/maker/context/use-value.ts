import { useMemo, useState } from 'react';

// Components
import { useForm } from 'design/components';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

type Mode = 'pick' | 'upload';

type PickValues = { hex: string };

const START = '#808080';

const useValue = () => {
  const hex = useCard()?.hex;
  const pick = useForm<PickValues>({
    resetOptions: { keepDirtyValues: true },
    values: { hex: (hex ?? START).toLowerCase() },
  });
  const [mode, setMode] = useState<Mode>('pick');
  const [pending, setPending] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  return useMemo(
    () => ({
      busy: sending || pending !== null,
      mode,
      pending,
      pick,
      setMode,
      setPending,
      setSending,
    }),
    [mode, pending, pick, sending]
  );
};

export { useValue, type Mode, type PickValues };
