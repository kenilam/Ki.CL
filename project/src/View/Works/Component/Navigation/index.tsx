import React, { FunctionComponent } from 'react';
import { Props } from './spec';
import { Navigation as Origin } from '@/Component';
import Style from './Style';

const Navigation: FunctionComponent<Props> = ({ data }) => {
  const items = (data || []).map(
    ({
      id,
      name,
    }) => ({
      children: <span aria-label={name}>{name}</span>,
      to: `/works/${id}`
    })
  );

  return (
    <Origin
      data-view-component={Style.default}
      items={items}
    />
  );
}

export default Navigation;
