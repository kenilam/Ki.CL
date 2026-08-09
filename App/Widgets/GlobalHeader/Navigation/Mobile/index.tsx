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
import { PATH as HOME_PATH } from '@/Views/Home';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--navigation--mobile';

const ICONS = {
  true: <Ri.RiCloseLine />,
  false: <Ri.RiMenuLine />,
};

const Links = [
  <HyperLink className='kicl-font-size' key={HOME_PATH} to={`/${HOME_PATH}`}>
    Home
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
    const url = new URL(location.pathname, window.location.origin);
    params.delete('globalNavigation');

    params.forEach((value, name) => {
      url.searchParams.append(name, value);
    });

    navigate(url);
  };

  const Icon = ICONS[String(hasNavigation)];

  const className = classNames('kicl-font-size', `${CLASS_NAME}--toggle`);

  const Toggle = (
    <Layout>
      <HyperLink
        className={className}
        preventScrollReset
        relative='route'
        to={`?globalNavigation=${TICK}`}
        unstyled
      >
        {Icon}
      </HyperLink>
    </Layout>
  );

  return (
    <>
      {Toggle}
      <Dialog onClose={onClose} open={hasNavigation}>
        <Layout justifyItems='start' gap='widest'>
          <section className={CLASS_NAME}>
            <Navigation
              animation={{
                animationDelay: 1200,
                animationDuration: 'slow',
                animationStyle: 'slide-from-top',
              }}
              autoFlow='column'
              gap='widest'
            >
              {Links}
            </Navigation>
          </section>
        </Layout>
      </Dialog>
    </>
  );
};

export default Mobile;
