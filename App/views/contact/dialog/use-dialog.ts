import { useEffect, useRef } from 'react';

// Routers
import { useLocation } from 'design/router';

const useDialog = () => {
  const { key } = useLocation();

  const node = useRef<HTMLDialogElement>(null);

  /*
   * Opened by a command from any page, so it outlives the route it was opened
   * on. It closes on every navigation, the back button included, as the
   * narrow navigation does.
   */
  useEffect(() => {
    node.current?.close();
  }, [key]);

  return node;
};

export { useDialog };
