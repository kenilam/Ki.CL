import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Dialog, Heading, Layout, Text } from '@/components';

// Diagrams
import { Diagram } from '@/views/portfolio/pika/system-design/diagrams';
import { agentPlane } from '@/views/portfolio/pika/system-design/diagrams/agent-plane';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** What the agent reuses from Part 1. */
const WhatChanges: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h4'>
      What changes, what stays shared
    </Heading>

    <Layout alignItems='center' justifyContent='stretch'>
      <Button
        aria-label='Agent plane diagram. Open the full image.'
        className={classNames(
          'kicl-inline-size-full',
          `${CLASS_NAME}__preview`
        )}
        command='show-modal'
        commandFor='diagram-agent-plane'
        unstyled
      >
        <Diagram spec={agentPlane} />
      </Button>
    </Layout>
    <Dialog
      aria-label='Agent plane diagram'
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-agent-plane'
    >
      <Layout alignItems='center' justifyContent='center'>
        <section>
          <Diagram spec={agentPlane} />
        </section>
      </Layout>
    </Dialog>
    <Text>
      The agent is another client of the platform. Every piece of Part 1&apos;s
      execution plane - jobs, orchestration, adapters, assets, credits,
      moderation, task metrics - serves the agent without modification. The
      agent needs the same vocabulary the Apps already speak, which is what the
      manifests and primitives in Part 1 were for.
    </Text>
  </>
);

export { WhatChanges };
