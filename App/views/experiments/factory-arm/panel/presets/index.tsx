import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Layout,
  List,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import {
  type Preset,
  useSetup,
  WIDE,
} from '@/views/experiments/factory-arm/setup';

// Partials
import { summary } from './summary';
import { Confirm } from '@/views/experiments/factory-arm/panel/confirm';
import { Unsaved } from './unsaved';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME, COPY } from '@/views/experiments/factory-arm/constants';

/**
 * The presets, the ones that ship with the page and the operator's own.
 * Each one's play button builds the cell from it; the one the running cell
 * came from is edged green. Playing while the arm is working asks first.
 * Once the cell is changed, a footer offers to save it as a new one.
 */
const Presets: React.FunctionComponent = () => {
  const { active, cell, discard, presets, proceed, setOpen } = useSetup();
  // A preset waiting on the operator to confirm starting over.
  const [pending, setPending] = useState<Preset | null>(null);

  // On small screens the panel covers the stage, so it folds away to show the run.
  const run = (preset: Preset) => {
    setPending(null);
    proceed(preset);
    setOpen(matchMedia(WIDE).matches);
  };

  // While the arm is working, ask first.
  const play = (preset: Preset) =>
    cell.current?.busy() ? setPending(preset) : run(preset);

  return (
    <>
      <CardContent className={`${CLASS_NAME}__panel-body`}>
        <List gap='narrow'>
          {presets.map((preset) => (
            <Card
              className={classNames(`${CLASS_NAME}__preset`, {
                [`${CLASS_NAME}__preset--active`]: preset.id === active,
              })}
              is='li'
              key={preset.id}
            >
              <Layout
                alignItems='center'
                autoFlow='column'
                frames='1fr--max-content'
                gap='narrow'
              >
                <div>
                  <Layout gap='narrowest'>
                    <div>
                      <CardTitle is='span'>{preset.name}</CardTitle>
                      <CardDescription
                        className='kicl-font-family-mono kicl-font-size-smaller'
                        is='span'
                      >
                        {summary(preset)}
                      </CardDescription>
                    </div>
                  </Layout>

                  <Button
                    onClick={() => play(preset)}
                    size='small'
                    variant='secondary'
                  >
                    <Ri.RiPlayFill aria-hidden />
                    <span className='kicl-hidden'>
                      {COPY.panel.play} {preset.name}
                    </span>
                  </Button>
                </div>
              </Layout>

              {preset.saved && (
                <Button
                  onClick={() => discard(preset.id)}
                  size='small'
                  variant='ghost'
                >
                  <span>{COPY.panel.remove}</span>
                </Button>
              )}
            </Card>
          ))}
        </List>
      </CardContent>

      <Unsaved />

      <Confirm
        onCancel={() => setPending(null)}
        onConfirm={() => pending && run(pending)}
        open={pending !== null}
      />
    </>
  );
};

export { Presets };
