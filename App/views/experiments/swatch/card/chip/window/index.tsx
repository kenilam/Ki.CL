import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Hooks
import { useClip } from './use-clip';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CHIP } from '@/views/experiments/swatch/card/chip/constants';

const CLASS_NAME = `${CHIP}__window`;

const Window: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const ref = useClip();

  return (
    <Layout gap='narrow'>
      <div className={classNames(CLASS_NAME, 'kicl-padding')} ref={ref}>
        {children}
      </div>
    </Layout>
  );
};

export { Window };
