import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Styles
import './styles.scss';

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
    const className = classNames(CLASS_NAME, {
      [`${CLASS_NAME}--animation-direction--${direction}`]: direction,
    });

    const style = {
      [`--${CLASS_NAME}--speed`]: `${speed}ms`,
    } as React.CSSProperties;

    const elementClassName = classNames(
      props.className,
      `${CLASS_NAME}--element`
    );

    /*
     * React 19 types `ReactElement.props` as `unknown`, so a clone that merges
     * the child's own props has to say what shape it expects.
     */
    const withClassName = (
      child: React.ReactElement,
      extra?: Record<string, unknown>
    ) => {
      const props = child.props as Record<string, unknown> & {
        className?: string;
      };

      return React.cloneElement(child as React.ReactElement<typeof props>, {
        ...props,
        className: classNames(props.className, elementClassName),
        ...extra,
      });
    };

    const Child = React.Children.map(children, (child) =>
      React.isValidElement(child) ? withClassName(child) : child
    );

    const Shadow = React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? withClassName(child, { 'aria-hidden': 'true' })
        : child
    );

    return (
      <div className={className} ref={ref} style={style}>
        <Layout autoFlow='column' gap='wide'>
          <div className={`${CLASS_NAME}--wrapper`}>
            {Shadow}
            {Child}
            {Shadow}
          </div>
        </Layout>
      </div>
    );
  }
);

export { InfiniteScroll };
