import React from 'react';

// Libraries
import classNames from 'classnames';

// Routers
import { useLocation, useNavigate } from '@/Router';

// Components
import { SlideOut, HyperLink, Layout, Navigation } from '@/Components';

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

  const onExited = () => {
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
      <SlideOut onExited={onExited} open={hasNavigation}>
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
      </SlideOut>
    </>
  );
};

export default Mobile;
