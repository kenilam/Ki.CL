import React from 'react';
import ReactDOM from 'react-dom';

// Libraries
import classNames from 'classnames';

// Helpers
import { CSSUnit } from '@/Helper';

// Animation
import Animation, { AnimationProps, ANIMATION_STYLES } from '@/Animation';

// Context
import { useGlobalHeaderContext } from '@/Widgets/GlobalHeader/Context';
import MenuProvider, {
  useMenuContext,
  DEFAULT,
} from '@/Widgets/GlobalHeader/MainMenu/Menu/Context';

// Views
import { PATH as ABOUT_PATH } from '@/Views/About';
import { PATH as WORKS_PATH } from '@/Views/Works';
import { PATH as ROLLING_BALL_PATH } from '@/Views/Works/RollingBall';
import { PATH as FISH_TANK_PATH } from '@/Views/Works/FishTank';

// Components
import { Menu as Origin } from '@/Components';
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
      animationStyle={ANIMATION_STYLES['slide-from-top']}
      in={open}
      onEntering={onEntering}
      onExited={onExited}
    >
      <Origin className={className} orientation='vertical'>
        <HyperLink index={1} to={ABOUT_PATH}>
          about
        </HyperLink>
        <HyperLink index={2} to={WORKS_PATH}>
          works
        </HyperLink>

        <Origin className='kicl-font-size' orientation='vertical'>
          <HyperLink index={3} to={`${WORKS_PATH}/${ROLLING_BALL_PATH}`}>
            Rolling Ball
          </HyperLink>
          <HyperLink index={4} to={`${WORKS_PATH}/${FISH_TANK_PATH}`}>
            Fish Tank
          </HyperLink>
        </Origin>
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
