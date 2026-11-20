import React from 'react';

// Components
import { Sheet } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSpent } from '@/views/experiments/swatch/use-spent';

// Partials
import { Provider } from './context';
import { Footer } from './footer';
import { Header } from './header';
import { Intro } from './intro';
import { Make } from './make';
import { Progress } from './progress';
import { Watch } from './watch';

// Constants
import { MAKER } from '@/views/experiments/swatch/constants';
import { CLASS_NAME } from './constants';

type Props = Pick<React.ComponentProps<typeof Sheet>, 'defaultOpen'>;

const Maker: React.FunctionComponent<Props> = ({ defaultOpen }) => {
  const { t } = useTranslation('swatch');
  const spent = useSpent();

  return (
    <Provider>
      <Sheet
        aria-label={t('action', { context: spent ? 'find' : 'make' })}
        className={CLASS_NAME}
        defaultOpen={defaultOpen}
        footer={<Footer />}
        header={<Header />}
        id={MAKER}
      >
        <Intro />
        <Make />
        <Progress />
      </Sheet>
      <Watch />
    </Provider>
  );
};

export { Maker };
