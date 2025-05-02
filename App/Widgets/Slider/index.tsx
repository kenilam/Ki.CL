import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';
import 'keen-slider/keen-slider.min.css';

// Components
import { Layout } from '@/Components';

// Context
import SliderProvider, { useSliderContext } from './Context';

// Partials
import Thumbnail from './Thumbnail';

// Constants
import { CLASS_NAME } from './constants';

// Plugins
import * as Plugins from './Plugins';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

type SliderProps = Spec.Props;

const Component: React.FunctionComponent<PropsWithChildren<SliderProps>> = ({
  children: element,
  ...rest
}) => {
  const { details, ref, style } = useSliderContext();

  if (React.Children.toArray(element).length > 1) {
    console.error(
      'Slider require a single element to render, consider wrap your elements with another tag'
    );

    return null;
  }

  if (!React.isValidElement(element)) {
    return null;
  }

  const { children, ...props } = element.props;

  const Nodes = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') {
        return child.trim();
      }

      return child;
    })
    .filter(Boolean);

  const Component = React.createElement(
    element.type,
    {
      ...props,
      className: classNames(
        element.props.className,
        'keen-slider',
        `${CLASS_NAME}--container`
      ),
      ref,
    },
    ...Nodes.map((item, index) => {
      if (React.Children.toArray(item).length > 1) {
        console.error(
          'Each child need to be a single element, consider wrap your elements with another tag'
        );

        return null;
      }

      if (!React.isValidElement(item)) {
        return null;
      }

      const { children, ...props } = item.props as PropsWithChildren<{
        className: string;
      }>;

      const className = classNames(
        props.className,
        'keen-slider__slide',
        `${CLASS_NAME}--item`
      );

      const Node = React.createElement(
        item.type,
        {
          ...props,
          className,
        },
        React.createElement(
          'div',
          {
            style: style?.({ details, index }),
          },
          children
        )
      );

      return Node;
    })
  );

  return (
    <Layout fullScreen justifyItems='center'>
      <div className={CLASS_NAME}>
        {Component}
        <Thumbnail {...rest} counts={Nodes.length} />
      </div>
    </Layout>
  );
};

const Slider: React.FunctionComponent<PropsWithChildren<SliderProps>> = ({
  children,
  ...rest
}) => {
  return (
    <SliderProvider {...rest}>
      <Component>{children}</Component>
    </SliderProvider>
  );
};

export { type SliderProps, Plugins };
export default Slider;
