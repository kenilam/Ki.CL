import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, Layout } from 'design/components';

// Partials
import { Controls } from '@/views/experiments/swatch/card/chip/controls';
import { Credit } from '@/views/experiments/swatch/card/chip/credit';
import { Name } from '@/views/experiments/swatch/card/chip/name';
import { Status } from '@/views/experiments/swatch/card/chip/status';
import { Values } from '@/views/experiments/swatch/card/chip/values';
import { Window } from '@/views/experiments/swatch/card/chip/window';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

// Helpers
import { isWhite } from '@/views/experiments/swatch/oklab';

// Constants
import {
  CLASS_NAME,
  PANE,
  WHITE,
} from '@/views/experiments/swatch/card/chip/constants';

const Narrower: React.FunctionComponent = () => {
  const hex = useCard()?.hex;

  return (
    <Card
      className={classNames(
        CLASS_NAME,
        `${CLASS_NAME}--narrower`,
        'kicl--theme--light',
        'kicl-position-relative',
        { [WHITE]: Boolean(hex && isWhite(hex)) }
      )}
      gap='narrow'
      is='section'
      size={2}
      style={hex ? { color: hex } : undefined}
    >
      <Window>
        <header>
          <Name />
          <Status />
        </header>
        <span
          aria-hidden
          className={classNames(PANE, 'kicl-aspect-ratio-video')}
        />
        <Layout gap='narrow'>
          <footer>
            <Values />
            <Controls />
          </footer>
        </Layout>
        <Credit />
      </Window>
    </Card>
  );
};

export { Narrower };
