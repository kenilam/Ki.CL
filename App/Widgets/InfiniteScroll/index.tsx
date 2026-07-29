import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

// Libraries
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

// Hooks
import { useResizeObserver } from '@/Hooks';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--infinite-scroll';

type Props = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: 'normal' | 'reverse';
    speed?: number;
  }
>;

const DEFAULT_SPEED = 150000;

const InfiniteScroll = React.forwardRef<HTMLDivElement, Props>(
  (
    { children, direction = 'normal', speed = DEFAULT_SPEED, ...props },
    ref
  ) => {
    const { node, rect } = useResizeObserver<HTMLDivElement>();

    const id = uuid();

    const uniqueClass = `${CLASS_NAME}--${id}`;

    const className = classNames(
      CLASS_NAME,
      uniqueClass,
      'kicl-position-relative',
      {
        [`${CLASS_NAME}--animation-direction--${direction}`]: direction,
      }
    );

    const elementClassName = classNames(
      props.className,
      `${CLASS_NAME}--element`
    );

    const Child = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child?.props,
          className: classNames(child?.props?.className, elementClassName),
        });
      }
      return child;
    });

    const Shadow = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child?.props,
          className: classNames(child?.props?.className, elementClassName),
          'aria-hidden': 'true',
        });
      }
      return child;
    });

    const Style = ReactDOM.createPortal(
      <style data-widget-infinite-scroll-uuid={`${uniqueClass}--css-variables`}>
        {`
            .${uniqueClass} {
              --kicl--widgets--infinite-scroll--block-size: ${
                rect?.height ? `${rect.height}px` : 'auto'
              };
              --kicl--widgets--infinite-scroll--speed: ${speed}ms;
            }
          `}
      </style>,
      window.document.body
    );

    return (
      <>
        {Style}
        <div className={className} ref={ref}>
          <div
            className={`${CLASS_NAME}--wrapper kicl-position-absolute`}
            ref={node}
          >
            {Shadow}
            {Child}
            {Shadow}
          </div>
        </div>
      </>
    );
  }
);

export default InfiniteScroll;
