import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Dialog, Heading, Text } from '@/components';

// Diagrams
import { Diagram } from '@/components';
import { agentPlane } from '@/views/portfolio/pika/system-design/diagrams/agent-plane';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** What the agent reuses from Part 1. */
const WhatChanges: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      What changes, what stays shared
    </Heading>

    <Diagram opens='diagram-agent-plane' spec={agentPlane} />
    <Dialog
      aria-label={agentPlane.title}
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-agent-plane'
    >
      <Diagram
        className={classNames(
          'kicl-inline-size-columns-12',
          'kicl-margin-inline-auto'
        )}
        spec={agentPlane}
      />
    </Dialog>
    <Text>
      The agent is another client of the platform. Part 1&apos;s execution plane
      (jobs, orchestration, adapters, assets, credits, moderation, task metrics)
      serves it unchanged, because the agent calls the same primitives the Apps
      already use.
    </Text>
  </>
);

export { WhatChanges };
