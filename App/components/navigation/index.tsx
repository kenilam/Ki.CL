import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, type AnimationProps, List, ListItem } from '@/components';

// Styles
import './styles.scss';

// Spec
import * as Spec from './spec';

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
      <nav {...rest} className={className} ref={ref}>
        <List
          alignContent={alignContent}
          alignItems={alignItems}
          autoFlow={autoFlow}
          frames={frames}
          fullScreen={fullScreen}
          gap={gap}
          is={is}
          justifyContent={justifyContent}
          justifyItems={justifyItems}
          wrap={wrap}
        >
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
        </List>
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

type NavigationProps = Spec.Props;

export { Navigation, type NavigationProps };
