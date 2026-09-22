import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { Badge, HyperLink, Layout } from '@/components';

// Context
import { useAnchorNav } from './context';

type Props = {
  id: string;
  label: string;
};

/** The badge is the link's name; it shows on hover and focus. */
const Item: React.FunctionComponent<Props> = ({ id, label }) => {
  const { active } = useAnchorNav();
  const current = active === id;

  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='column'
      gap='narrow'
      justifyContent='start'
    >
      <HyperLink
        aria-current={current ? 'location' : undefined}
        to={`#${id}`}
        unstyled
      >
        <Badge className={classNames('kicl-font-size-small')} size='small'>
          {label}
        </Badge>
        <Layout
          alignContent='center'
          alignItems='center'
          autoFlow='column'
          gap='narrow'
          justifyContent='start'
          justifyItems='start'
        >
          <span
            className={classNames(
              'kicl-font-size-smaller',
              'kicl-position-relative'
            )}
          >
            {current ? (
              <Ri.RiCheckboxBlankCircleFill aria-hidden />
            ) : (
              <Ri.RiCheckboxBlankCircleLine aria-hidden />
            )}
          </span>
        </Layout>
      </HyperLink>
    </Layout>
  );
};

export { Item };
