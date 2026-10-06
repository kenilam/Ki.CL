import React, { useEffect, useRef } from 'react';

// Routers
import { useLocation } from 'design/router';

// Components
import { Dialog, Navigation } from 'design/components';

// Views
import { Mobile as Account } from '@/views/account/mobile';
import { useAccount } from '@/views/account/use-account';

// Widgets
import { Links } from '@/views/navigation/links';

// Partials
import { Close } from './close';
import { Open } from './open';

// Constants
import { CLASS_NAME } from './constants';
import { LABEL } from '@/views/navigation/constants';

const COPY = {
  label: 'Navigation',
};

// Styles
import './styles.scss';

const Mobile: React.FunctionComponent = () => {
  const { key } = useLocation();

  const { me } = useAccount();

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
        aria-label={COPY.label}
        className={CLASS_NAME}
        closable='keyboard'
        fullScreen
        id={CLASS_NAME}
        ref={node}
      >
        <Close />

        <Navigation
          aria-label={LABEL}
          autoFlow='row'
          gap='normal'
          justifyItems='end'
        >
          {Links}
          {me ? <Account key='account' /> : null}
        </Navigation>
      </Dialog>
    </>
  );
};

export { Mobile };
