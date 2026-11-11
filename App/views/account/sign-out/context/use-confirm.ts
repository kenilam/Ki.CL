import { useState } from 'react';

// Session
import { useSignOut } from '@/session';

const useConfirm = () => {
  const signOut = useSignOut();

  const [state, setState] = useState<'idle' | 'pending' | 'failed'>('idle');

  const confirm = async () => {
    setState('pending');

    try {
      await signOut();
    } catch {
      setState('failed');
    }
  };

  return { confirm, pending: state === 'pending', state };
};

export { useConfirm };
