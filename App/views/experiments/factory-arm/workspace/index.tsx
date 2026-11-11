import React from 'react';

// Context
import { useRunContext } from '@/views/experiments/factory-arm/run-context';
import { Provider as ArmProvider } from './arm-context';
import { Provider as CasesProvider } from './cases-context';
import { Provider as KnowledgeProvider } from './knowledge-context';
import { Provider as NoticesProvider } from './notices-context';
import { Provider as ObstaclesProvider } from './obstacles-context';
import { Provider as SelectionProvider } from './selection-context';

// Partials
import { Attach } from './attach';
import { Back } from './back';
import { Open } from './open';
import { Panel } from './panel';
import { Stage } from './stage';

/**
 * The stage, and the setup panel over its right side. Only the stage and
 * its cell are built again from the applied setup each time the operator
 * proceeds; the panel stays as it is. On small screens the panel folds away
 * behind the settings button.
 */
const Workspace: React.FunctionComponent = () => {
  const { run } = useRunContext();

  return (
    <>
      <ArmProvider key={run}>
        <CasesProvider>
          <KnowledgeProvider>
            <ObstaclesProvider>
              <SelectionProvider>
                <NoticesProvider>
                  <Attach />
                  <Stage />
                </NoticesProvider>
              </SelectionProvider>
            </ObstaclesProvider>
          </KnowledgeProvider>
        </CasesProvider>
      </ArmProvider>

      <Back />
      <Open />
      <Panel />
    </>
  );
};

export { Workspace };
