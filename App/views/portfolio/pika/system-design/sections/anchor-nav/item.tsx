import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { Badge, Button, Layout } from '@/components';

// Context
import { useAnchorNav } from './context';

type Props = {
  id: string;
  label: string;
};

const Item: React.FunctionComponent<Props> = ({ id, label }) => {
  const { active, go } = useAnchorNav();
  const current = active === id;

  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='column'
      gap='narrow'
      justifyContent='start'
    >
      <li>
        <Badge className={classNames('kicl-font-size-small')} size='small'>
          {label}
        </Badge>
        <Button
          aria-current={current ? 'true' : undefined}
          aria-label={label}
          className={classNames(
            'kicl-font-size-smaller',
            'kicl-position-relative'
          )}
          onClick={() => go(id)}
          type='button'
          unstyled
        >
          {current ? (
            <Ri.RiCheckboxBlankCircleFill aria-hidden />
          ) : (
            <Ri.RiCheckboxBlankCircleLine aria-hidden />
          )}
        </Button>
      </li>
    </Layout>
  );
};

export { Item };
