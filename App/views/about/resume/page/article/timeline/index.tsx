import React from 'react';

import classNames from 'classnames';

import { Earlier } from './earlier';
import { Roles } from './roles';
import { Title } from './title';

const Timeline: React.FunctionComponent = () => {
  return (
    <section
      className={classNames(
        'kicl-padding-block-end-screen-quarter',
        'kicl-padding-inline-frame-columns-12',
        'kicl-scroll-snap-page'
      )}
    >
      <Title />
      <Roles />
      <Earlier />
    </section>
  );
};

export { Timeline };
