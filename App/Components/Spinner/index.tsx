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
  // Overlay can stagger icon vs backdrop; inline indicators must appear
  // immediately or short fetches never show a spinner.
  const stagger = isOverlay ? DELAY : 0;

  const className = classNames(
    CLASS_NAME,
    {
      'kicl-font-size-large': isOverlay,
      [`${CLASS_NAME}--no-backdrop`]: !hasBackdrop,
      [`${CLASS_NAME}--position--${position}`]: position,
      [`${CLASS_NAME}--size--${size}`]: size,
    },
    _className
  );

  const entering = Boolean(transitionIn);
  const spinnerAnimationDelay = entering ? DURATION : animationDuration;
  const spinnerDelay = entering ? animationDelay + stagger : animationDelay;

  const wrapperAnimationDelay = entering ? animationDuration : DURATION;
  const wrapperDelay = entering ? animationDelay : animationDelay + stagger;

  const Contents = (
    <Animation
      {...rest}
      animationDelay={wrapperDelay}
      animationDuration={wrapperAnimationDelay}
      in={transitionIn}
    >
      <Layout
        display={isOverlay ? 'grid' : 'inline-grid'}
        alignContent='center'
        alignItems='center'
        justifyContent='center'
        justifyItems='center'
      >
        <Text className={className} is='span' role='progressbar' unstyled>
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
            <Layout display={isOverlay ? 'grid' : 'inline-grid'}>
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
