import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { HyperLink, Layout, List, ListItem, Text } from '@/components';

// Spec
import * as Spec from './spec';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--components--page-indicator';

/**
 * A column of dots on the right edge of the screen, one per full-screen
 * page, each linking to its page. Page `n` counts as current while the
 * document has scrolled about `n` page heights; the dot's state is a
 * scroll-driven animation, see styles.scss.
 */
const PageIndicator = React.forwardRef<HTMLElement, Spec.Props>(
  ({ className, pages, style, ...rest }, ref) => (
    <Layout alignContent='center' justifyItems='center'>
      <nav
        {...rest}
        className={classNames(
          CLASS_NAME,
          'kicl-inset-block-0',
          'kicl-pointer-events-none',
          'kicl-position-fixed',
          className
        )}
        ref={ref}
        style={
          {
            '--kicl--components--page-indicator--count': pages.length,
            ...style,
          } as never
        }
      >
        <List is='ol' gap='none'>
          {pages.map(({ id, label }, index) => (
            <ListItem key={id}>
              <HyperLink
                className={classNames(
                  `${CLASS_NAME}__dot`,
                  'kicl-pointer-events-auto'
                )}
                style={
                  {
                    '--kicl--components--page-indicator--index': index,
                  } as never
                }
                title={label}
                to={`#${id}`}
                unstyled
              >
                <Text is='span' className='kicl-hidden'>
                  {label}
                </Text>
              </HyperLink>
            </ListItem>
          ))}
        </List>
      </nav>
    </Layout>
  )
);

PageIndicator.displayName = 'PageIndicator';

type PageIndicatorPage = Spec.Page;
type PageIndicatorProps = Spec.Props;

export { PageIndicator, type PageIndicatorPage, type PageIndicatorProps };
