import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, type AnimationProps, Layout, ListItem } from '@/Components';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--navigation';

const Navigation = React.forwardRef<
  HTMLElement,
  Required<PropsWithChildren> & Spec.Props
>(
  (
    {
      children,
      className: _className = '',

      alignContent,
      alignItems,
      autoFlow,
      frames,
      fullScreen,
      gap = 'normal',
      is = 'ul',
      justifyContent,
      justifyItems,
      wrap,

      ...rest
    },
    ref
  ) => {
    const className = classNames(CLASS_NAME, _className);

    let animation: AnimationProps = {
      duration: 'faster',
      property: 'slide-from-top',
    };

    return (
      <Layout
        alignContent={alignContent}
        alignItems={alignItems}
        autoFlow={autoFlow}
        frames={frames}
        fullScreen={fullScreen}
        gap={gap}
        justifyContent={justifyContent}
        justifyItems={justifyItems}
        wrap={wrap}
      >
        <nav {...rest} className={className} ref={ref}>
          {React.Children.toArray(children).map((child, index) => {
            let key = String(child);

            if (React.isValidElement(child)) {
              key = String(child.key);
            }

            return (
              <Animation {...animation} delay={300 + 60 * index} key={key}>
                <ListItem className={`${CLASS_NAME}--list-item`} key={key}>
                  {child}
                </ListItem>
              </Animation>
            );
          })}
        </nav>
      </Layout>
    );
  }
);

Navigation.displayName = 'Navigation';

type NavigationProps = Spec.Props;

export { type NavigationProps };
export default Navigation;
