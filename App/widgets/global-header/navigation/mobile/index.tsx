import React, { useEffect, useRef } from 'react';

// Routers
import { useLocation } from '@/router';

// Components
import { Dialog, Navigation } from '@/components';

// Widgets
import { Links } from '@/widgets/global-header/links';

// Partials
import { Close } from './close';
import { Open } from './open';

// Constants
import { CLASS_NAME } from './constants';

// Styles
import './styles.scss';

const Mobile: React.FunctionComponent = () => {
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

  return (
    <>
      <Open />

      <Dialog
        className={CLASS_NAME}
        closable='keyboard'
        fullScreen
        id={CLASS_NAME}
        ref={node}
      >
        <Close />

        <Navigation autoFlow='row' gap='normal' justifyItems='start'>
          {Links}
        </Navigation>
      </Dialog>
    </>
  );
};

export { Mobile };
