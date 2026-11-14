import React from 'react';

// Components
import { Dialog, Navigation } from 'design/components';

// Views
import { Narrow as Account } from './account';
import { useAccount } from '@/views/account/use-account';

// Hooks
import { useTranslation } from 'design/hooks';
import { useDialog } from './use-dialog';

// Partials
import { About } from './about';
import { Close } from './close';
import { Experiments } from './experiments';
import { Home } from './home';
import { Open } from './open';
import { Workshop } from './workshop';

// Constants
import { CLASS_NAME } from './constants';

// Styles
import './styles.scss';

const Narrow: React.FunctionComponent = () => {
  const { me } = useAccount();
  const { t } = useTranslation();
  const node = useDialog();

  return (
    <>
      <Open />

      <Dialog
        aria-label={t('navigation')}
        className={CLASS_NAME}
        closable='keyboard'
        fullScreen
        id={CLASS_NAME}
        ref={node}
      >
        <Close />

        <Navigation
          aria-label={t('main')}
          autoFlow='row'
          gap='normal'
          justifyItems='end'
        >
          <Home key='home' />
          <Experiments key='experiments' />
          <Workshop key='workshop' />
          <About key='about' />
          {me ? <Account key='account' /> : null}
        </Navigation>
      </Dialog>
    </>
  );
};

export { Narrow };
