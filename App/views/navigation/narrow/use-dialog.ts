import { useRef } from 'react';

// Routers
import { useCloseOnNavigate } from 'design/router';

const useDialog = () => {
  const node = useRef<HTMLDialogElement>(null);

  useCloseOnNavigate(node);

  return node;
};

export { useDialog };
