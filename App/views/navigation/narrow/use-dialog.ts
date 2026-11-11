import { useEffect, useRef } from 'react';

// Routers
import { useLocation } from 'design/router';

const useDialog = () => {
  const { key } = useLocation();

  const node = useRef<HTMLDialogElement>(null);

  /*
   * A command opens and closes the dialog from markup, but a link inside it
   * only changes the route behind it. `key` rather than `pathname`, because it
   * changes on every navigation - including a link to the route already open,
   * and including the back button.
   */
  useEffect(() => {
    node.current?.close();
  }, [key]);

  return node;
};

export { useDialog };
