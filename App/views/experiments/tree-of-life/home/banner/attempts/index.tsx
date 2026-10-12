import React, { useId } from 'react';

// Library
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, List } from 'design/components';

// Partials
import { Era } from './era';

// Constants
import { ERAS } from './constants';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__attempts';

const Attempts: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
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
          {t('attempts')}
        </Heading>
        <List justifyContent='start' gap='narrow'>
          {ERAS.map((era) => (
            <Era key={era.context} {...era} />
          ))}
        </List>
      </nav>
    </Layout>
  );
};

export { Attempts };
