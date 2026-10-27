import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card } from 'design/components';

// Search
import { Search } from './search';

// Constants
import { CLASS_NAME } from './constants';

const Panel: React.FunctionComponent = () => (
  <Card
    size='fit'
    variant='secondary'
    className={classNames(
      `${CLASS_NAME}__chrome`,
      'kicl-position-fixed',
      'kicl-z-index-floating',
      'kicl-inset-block-start',
      'kicl-inset-inline-start'
    )}
  >
    <Search />
  </Card>
);

export { Panel };
