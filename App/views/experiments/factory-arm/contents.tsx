import React from 'react';

// Context
import { Provider as AppliedProvider } from './applied-context';
import { Provider as CellProvider } from './cell-context';
import { Provider as DraftProvider } from './draft-context';
import { Provider as LogProvider } from './log-context';
import { Provider as PanelProvider } from './panel-context';
import { Provider as PendingProvider } from './pending-context';
import { Provider as PresetsProvider } from './presets-context';
import { Provider as RunProvider } from './run-context';

// Partials
import { Title } from './title';
import { Workspace } from './workspace';

/**
 * Kept in the lazy chunk so three.js ships only with this route. What the
 * cell is built from sits above the cell itself, so it outlives each run.
 */
const FactoryArm: React.FunctionComponent = () => {
  return (
    <LogProvider>
      <AppliedProvider>
        <PanelProvider>
          <PresetsProvider>
            <DraftProvider>
              <CellProvider>
                <RunProvider>
                  <PendingProvider>
                    <Title />
                    <Workspace />
                  </PendingProvider>
                </RunProvider>
              </CellProvider>
            </DraftProvider>
          </PresetsProvider>
        </PanelProvider>
      </AppliedProvider>
    </LogProvider>
  );
};

export { FactoryArm };
