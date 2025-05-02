import React from 'react';
import ReactDOM from 'react-dom';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, AnimationProps, Layout, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--spinner';

const DELAY: AnimationProps['animationDelay'] = 200;
const DURATION: AnimationProps['animationDuration'] = 'fast';

const Spinner: React.FunctionComponent<Spec.Props> = ({
  animationDelay = 0,
  animationDuration = 'fast',
  animationStyle = 'zoom-out',
  atRoot,
  className: _className,
  hasBackdrop = true,
  in: transitionIn,
  onEnter,
  onEntered,
  onEntering,
  onExit,
  onExited,
  onExiting,
  position = 'overlay',
  size,
  ...rest
}) => {
  const isOverlay = position === 'overlay';

  const className = classNames(
    CLASS_NAME,
    {
      'kicl-font-size-large': isOverlay,
      'kicl-font-size-normal': !isOverlay,
      [`${CLASS_NAME}--no-backdrop`]: !hasBackdrop,
      [`${CLASS_NAME}--position--${position}`]: position,
      [`${CLASS_NAME}--size--${size}`]: size,
    },
    _className
  );

  const spinnerAnimationDelay = transitionIn ? DURATION : animationDuration;
  const spinnerDelay = transitionIn ? animationDelay + DELAY : animationDelay;

  const wrapperAnimationDelay = transitionIn ? animationDuration : DURATION;
  const wrapperDelay = transitionIn ? animationDelay : animationDelay + DELAY;

  const Contents = (
    <Animation
      {...rest}
      animationDelay={wrapperDelay}
      animationDuration={wrapperAnimationDelay}
      in={transitionIn}
    >
      <Layout
        alignContent='center'
        alignItems='center'
        justifyContent='center'
        justifyItems='center'
      >
        <Text className={className} is='span' role='progressbar'>
          <Animation
            {...rest}
            animationDelay={spinnerDelay}
            animationDuration={spinnerAnimationDelay}
            animationStyle={animationStyle}
            in={transitionIn}
            onEnter={onEnter}
            onEntered={onEntered}
            onEntering={onEntering}
            onExit={onExit}
            onExited={onExited}
            onExiting={onExiting}
          >
            <Layout>
              <Text is='span'>
                <Ri.RiLoader3Line className={`${CLASS_NAME}--icon`} />
              </Text>
            </Layout>
          </Animation>
        </Text>
      </Layout>
    </Animation>
  );

  if (!atRoot) {
    return Contents;
  }

  const Root = document.querySelector('body');

  if (!Root) {
    return Contents;
  }

  return <>{ReactDOM.createPortal(Contents, Root)}</>;
};

type SpinnerProps = Spec.Props;

export { type SpinnerProps };
export default Spinner;
