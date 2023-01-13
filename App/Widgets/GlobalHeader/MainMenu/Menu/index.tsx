import React from 'react';
import ReactDOM from 'react-dom';

// Libraries
import classNames from 'classnames';

// Helpers
import { CSSUnit } from '@/Helper';

// Animation
import Animation, { AnimationProps, ANIMATION_STYLES } from '@/Animation';

// Components
import { Menu as Origin } from '@/Components';

// Context
import { useGlobalHeaderContext } from '@/Widgets/GlobalHeader/Context';
import MenuProvider, { useMenuContext, DEFAULT } from './Context';

// Components
import HyperLink from './HyperLink';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--main-menu--menu';

const DEBOUNCE = CSSUnit({
  values: window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--kicl-duration-fast'),
});

const Component: React.FunctionComponent = () => {
  const { open, node } = useGlobalHeaderContext();
  const { incrementIndex, setIndex } = useMenuContext();

  if (!node.current?.parentElement) {
    return null;
  }

  const onEntering: AnimationProps['onEntering'] = () => {
    window.setTimeout(incrementIndex, DEBOUNCE);
  };

  const className = classNames(
    CLASS_NAME,
    'kicl-font-family-special',
    'kicl-font-size-larger',
    'kicl-line-height-narrow',
    {
      'is-closed': !open,
    }
  );

  const onExited: AnimationProps['onExited'] = () => {
    setIndex(DEFAULT.index);
  };

  return ReactDOM.createPortal(
    <Animation
      animationStyle={ANIMATION_STYLES['slide-down']}
      in={open}
      onEntering={onEntering}
      onExited={onExited}
      unmountOnExit={false}
    >
      <Origin className={className} orientation='vertical'>
        <HyperLink index={1} to='/about'>
          about
        </HyperLink>
        <HyperLink index={2} to='/works'>
          works
        </HyperLink>
      </Origin>
    </Animation>,
    node.current.parentElement
  );
};

const Menu: React.FunctionComponent = () => {
  return (
    <MenuProvider>
      <Component />
    </MenuProvider>
  );
};

export { CLASS_NAME };
export default Menu;
