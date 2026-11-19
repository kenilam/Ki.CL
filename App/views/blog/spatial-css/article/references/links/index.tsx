import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Link } from './link';

// Constants
import { LINKS } from './constants';

const Links: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {LINKS.map((link) => {
        return <Link link={link} key={link} />;
      })}
    </List>
  );
};

export { Links };
