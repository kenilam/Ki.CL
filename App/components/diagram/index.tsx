import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Layout, Text } from '@/components';

// Styles
import './styles.scss';

// Constants
import { BASE } from './constants';

// Spec
import type { Spec } from './spec';

// Partials
import { Drawing, type DiagramState } from './drawing';
import { Legend } from './legend';

type Props = {
  /** Id of the dialog that shows this diagram full size. */
  opens?: string;
  ref?: React.Ref<HTMLElement>;
  spec: Spec;
  state?: DiagramState;
};

/**
 * Declarative SVG diagram (boxes, stores, queues and the arrows between
 * them), drawn with the design system's own tokens - surfaces, borders, brand accents, and the site typeface - so it
 * follows the theme instead of shipping as a static image.
 */
const Diagram: React.FunctionComponent<Props> = ({
  opens,
  ref,
  spec,
  state,
}) => {
  const drawing = <Drawing spec={spec} state={state} />;

  return (
    <figure className={classNames(BASE, 'kicl-position-relative')} ref={ref}>
      {opens ? (
        <Layout alignItems='center' justifyContent='stretch'>
          <Button
            aria-label={`${spec.title}. Open the full image.`}
            className={classNames('kicl-inline-size-full', `${BASE}-preview`)}
            command='show-modal'
            commandFor={opens}
            unstyled
          >
            {drawing}
          </Button>
        </Layout>
      ) : (
        drawing
      )}
      {spec.caption || spec.legend ? (
        <figcaption className='kicl-padding-block-start-narrow'>
          {spec.legend ? <Legend items={spec.legend} /> : null}
          {spec.caption ? (
            <Text
              className='kicl-font-size-small'
              dense
              is='span'
              variant='secondary'
            >
              {spec.caption}
            </Text>
          ) : null}
          <span className='kicl-hidden'> {spec.description}</span>
        </figcaption>
      ) : (
        <figcaption className='kicl-hidden'>{spec.description}</figcaption>
      )}
    </figure>
  );
};

export type { DiagramState };
export type {
  LegendItem as DiagramLegendItem,
  Spec as DiagramSpec,
} from './spec';
export { Diagram, Legend as DiagramLegend };
