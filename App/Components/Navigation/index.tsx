import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout, ListItem } from '@/Components';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--navigation';

/** Milliseconds each item waits behind the one before it. */
const STAGGER = 100;

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

            /*
             * Derived, never mutated. `rest.animation` is the caller's own
             * object and the same reference for every item, so writing the
             * stagger back into it added to the previous item's delay and to
             * the previous render's. A list configured for 800ms was measured
             * waiting 3.7s and climbing — long enough to read as the animation
             * never firing at all.
             */
            const source =
              rest.animation === true
                ? { property: 'fade' as const }
                : rest.animation === false
                  ? { duration: 'instant' as const }
                  : (rest.animation ?? {});

            const animation = {
              ...source,
              delay: (source.delay ?? 0) + STAGGER * (index + 1),
            };

            return (
              <Animation {...animation} key={key}>
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
