import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Libraries
import classNames from 'classnames';

// Animation
import Animation, { AnimationProps, ANIMATION_STYLES } from '@/Animation';

// Context
import { useGlobalHeaderContext } from '@/Widgets/GlobalHeader/Context';

// Components
import { Menu as Origin } from '@/Components';
import HyperLink from './HyperLink';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header--main-menu--menu';

const DEFAULT_INDEX = 0;

const Menu: React.FunctionComponent = () => {
  const { open, node } = useGlobalHeaderContext();

  const [index, setIndex] = useState(DEFAULT_INDEX);

  if (!node.current?.parentElement) {
    return null;
  }

  const className = classNames(
    CLASS_NAME,
    'kicl-font-family-special',
    'kicl-font-size-larger',
    'kicl-line-height-narrow',
    {
      'is-closed': !open,
    }
  );

  const onEntered: AnimationProps['onEntered'] = () => {
    setIndex((index) => index + 1);
  };

  const onEntering: AnimationProps['onEntering'] = () => {
    setIndex((index) => index + 1);
  };

  const onExited: AnimationProps['onExited'] = () => {
    setIndex(DEFAULT_INDEX);
  };

  return ReactDOM.createPortal(
    <Animation
      animationStyle={ANIMATION_STYLES['slide-down']}
      in={open}
      unmountOnExit={false}
      onEntered={onEntered}
      onExited={onExited}
    >
      <Origin className={className} orientation='vertical'>
        <HyperLink in={index >= 1} onEntering={onEntering} to='/about'>
          about
        </HyperLink>
        <HyperLink in={index >= 2} to='/works'>
          works
        </HyperLink>
      </Origin>
    </Animation>,
    node.current.parentElement
  );
};

export default Menu;
