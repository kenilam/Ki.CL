import React from 'react';

// Libraries
import classNames from 'classnames';

// Routers
import { useLocation, useNavigate } from '@/Router';

// Components
import { Dialog, HyperLink, Layout, Navigation } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Constants
import { TICK } from '@/constants';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/Views/Experiments';
import { PATH as HOME_PATH } from '@/Views/Home';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--navigation--mobile';

const ICONS = {
  true: <Ri.RiCloseLine />,
  false: <Ri.RiMenuLine />,
};

const Links = [
  <HyperLink
    className='kicl-font-size-medium'
    key={HOME_PATH}
    to={`/${HOME_PATH}`}
    unstyled
  >
    Home
  </HyperLink>,
  <HyperLink
    className='kicl-font-size-medium'
    key={EXPERIMENTS_PATH}
    to={`/${EXPERIMENTS_PATH}`}
    unstyled
  >
    Experiments
  </HyperLink>,
];

const Mobile: React.FunctionComponent = () => {
  const { search, ...location } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);

  const hasNavigation = params.get('globalNavigation') === TICK;

  /*
   * The dialog's own close event, rather than a wrapper's. It fires whether the
   * dialog was dismissed by Escape, by the backdrop or by the close control, so
   * one handler covers every way out.
   */
  const onClose = () => {
    if (!hasNavigation) {
      return;
    }

    const url = new URL(location.pathname, window.location.origin);
    params.delete('globalNavigation');

    params.forEach((value, name) => {
      url.searchParams.append(name, value);
    });

    navigate(url);
  };

  const Icon = ICONS[String(hasNavigation)];

  const toggle = (isOverlaid: boolean) => (
    <Layout alignContent='center'>
      <HyperLink
        className={classNames('kicl-font-size', `${CLASS_NAME}--toggle`, {
          'kicl-position-fixed': isOverlaid,
          [`${CLASS_NAME}--toggle--is-overlaid`]: isOverlaid,
        })}
        preventScrollReset
        relative='route'
        to={isOverlaid ? location.pathname : `?globalNavigation=${TICK}`}
        unstyled
      >
        {Icon}
      </HyperLink>
    </Layout>
  );

  return (
    <>
      {toggle(false)}
      <Dialog
        className={CLASS_NAME}
        closable='keyboard'
        fullScreen
        onClose={onClose}
        open={hasNavigation}
      >
        {toggle(true)}
        <Navigation autoFlow='row' gap='normal' justifyItems='start'>
          {Links}
        </Navigation>
      </Dialog>
    </>
  );
};

export default Mobile;
