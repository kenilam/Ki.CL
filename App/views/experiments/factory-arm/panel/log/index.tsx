import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Animation,
  Button,
  CardContent,
  Details,
  Layout,
  SheetFooter,
  Text,
} from 'design/components';

// Context
import { type Entry, useSetup } from '@/views/experiments/factory-arm/setup';

// Partials
import { Steps, time } from './steps';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/** The log split by run, newest run first. */
const runs = (log: Entry[]) => {
  const groups = new Map<number, Entry[]>();

  log.forEach((entry) => {
    groups.set(entry.run, [...(groups.get(entry.run) ?? []), entry]);
  });

  return [...groups.values()];
};

/**
 * Every step the cell took, newest first: where each case went from and to,
 * what was given up and why, what hit what, and what was tried again. The
 * run under way is open; each earlier one folds into a disclosure named by
 * how it started, to open when wanted.
 */
const Log: React.FunctionComponent = () => {
  const { clearLog, log } = useSetup();
  const [latest, ...earlier] = runs(log);

  return (
    <>
      <Layout alignContent='start' gap='normal'>
        <CardContent>
          {latest ? (
            <>
              <Steps entries={latest} />

              {earlier.map((entries) => {
                // Oldest last: the step that started that run. A run the page opened with wasn't started by a step.
                const first = entries[entries.length - 1];
                const name = first.start ? first.text : COPY.panel.first;

                return (
                  <Details
                    key={first.id}
                    summary={
                      <Text className='kicl-font-size-small' is='span'>
                        {name} · {time(first.at)} · {entries.length}{' '}
                        {entries.length === 1
                          ? COPY.panel.step
                          : COPY.panel.steps}
                      </Text>
                    }
                  >
                    <Steps entries={entries} />
                  </Details>
                );
              })}
            </>
          ) : (
            <Text
              className={classNames('kicl-color-grey', 'kicl-font-size-small')}
              is='p'
            >
              {COPY.panel.empty}
            </Text>
          )}
        </CardContent>
      </Layout>

      {log.length > 0 && (
        <Animation property='slide-from-bottom'>
          <SheetFooter>
            <Button
              className='kicl-inline-size-full'
              justifyContent='center'
              onClick={clearLog}
              size='small'
              variant='secondary'
            >
              {COPY.panel.clear}
            </Button>
          </SheetFooter>
        </Animation>
      )}
    </>
  );
};

export { Log };
