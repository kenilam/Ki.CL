import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/**
 * The presets, the ones that ship with the page and the operator's own.
 * Each one's play button builds the cell from it; the one the running cell
 * came from is edged green, and its button starts it over. Playing while the
 * arm is working asks first. Once the cell is changed, a footer offers to
 * save it as a new one.
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
      <CardContent>
        <List gap='narrow'>
          {presets.map((preset) => (
            <Card
              is='li'
              key={preset.id}
              level={preset.id === active ? 'confirm' : undefined}
            >
              <CardHeader>
                <CardTitle is='span'>{preset.name}</CardTitle>
                <CardDescription
                  className={classNames(
                    'kicl-font-family-mono',
                    'kicl-font-size-smaller'
                  )}
                  is='span'
                >
                  {summary(preset)}
                </CardDescription>
                <CardAction>
                  <Button
                    onClick={() => play(preset)}
                    size='small'
                    variant='secondary'
                  >
                    {preset.id === active ? (
                      <Ri.RiRestartLine aria-hidden />
                    ) : (
                      <Ri.RiPlayFill aria-hidden />
                    )}
                    <span className='kicl-hidden'>
                      {preset.id === active
                        ? COPY.panel.restart
                        : COPY.panel.play}{' '}
                      {preset.name}
                    </span>
                  </Button>
                </CardAction>
              </CardHeader>

              {preset.saved && (
                <Button
                  onClick={() => discard(preset.id)}
                  size='small'
                  variant='ghost'
                >
                  {COPY.panel.remove}
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
