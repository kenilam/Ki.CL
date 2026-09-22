import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Dialog, Heading, Layout, Text } from '@/components';

// Diagrams
import { Diagram } from '@/views/portfolio/pika/system-design/diagrams';
import { dataModel } from '@/views/portfolio/pika/system-design/diagrams/data-model';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** Jobs, tasks, attempts and assets. */
const CoreDataModel: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h4'>
      Core data model
    </Heading>
    <Layout alignItems='center' justifyContent='stretch'>
      <Button
        aria-label='Core data model diagram. Open the full image.'
        className={classNames(
          'kicl-inline-size-full',
          `${CLASS_NAME}__preview`
        )}
        command='show-modal'
        commandFor='diagram-data-model'
        unstyled
      >
        <Diagram spec={dataModel} />
      </Button>
    </Layout>
    <Dialog
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-data-model'
    >
      <Layout alignItems='center' justifyContent='center'>
        <section>
          <Diagram spec={dataModel} />
        </section>
      </Layout>
    </Dialog>
    <Text>
      Task output refs point into content-addressed asset storage rather than
      carrying blobs inline. The lineage field on assets records which job,
      task, and seed produced each artifact. That is what makes regenerate work
      and how provenance gets displayed - and in Part 2, the same lineage
      records serve as the agent&apos;s memory of what exists in a session.
    </Text>
  </>
);

export { CoreDataModel };
