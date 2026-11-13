import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Order } from './order';

// Constants
import { ORDERS } from './constants';

const Orders: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {ORDERS.map((order) => {
        return <Order order={order} key={order} />;
      })}
    </List>
  );
};

export { Orders };
