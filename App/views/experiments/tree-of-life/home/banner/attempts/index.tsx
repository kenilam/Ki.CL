import React, { useId } from 'react';

// Library
import classNames from 'classnames';

// Components
import { Heading, Layout, List } from '@/components';

// Partials
import { Era } from './era';

// Constants
import { ERAS } from './constants';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__attempts';

const Attempts: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyContent='start' className='kicl-position-relative'>
      <nav className={CLASS_NAME} aria-labelledby={id}>
        <Heading
          id={id}
          is='h2'
          lookLike='h3'
          dense
          className={classNames('kicl-font-family-mono')}
        >
          Fifteen attempts:
        </Heading>
        <List justifyContent='start' gap='narrow'>
          {ERAS.map((era) => (
            <Era key={era.label} {...era} />
          ))}
        </List>
      </nav>
    </Layout>
  );
};

export { Attempts };
