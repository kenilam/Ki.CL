import React from 'react';

// Components
import { Dialog, Heading, Layout, Text } from '@/components';

// Diagrams
import { Diagram } from '@/components';
import { dataModel } from '@/views/portfolio/pika/system-design/diagrams/data-model';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** Jobs, tasks, attempts and assets. */
const CoreDataModel: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      Core data model
    </Heading>
    <Diagram opens='diagram-data-model' spec={dataModel} />
    <Dialog
      aria-label={dataModel.title}
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-data-model'
    >
      <Layout alignItems='center' justifyContent='center'>
        <div>
          <Diagram spec={dataModel} />
        </div>
      </Layout>
    </Dialog>
    <Text>
      Task output refs point into content-addressed asset storage instead of
      carrying blobs inline. The lineage field on assets records which job,
      task, and seed produced each artifact. Regenerate and provenance both read
      from it, and in Part 2 the same lineage records are the agent&apos;s
      memory of what exists in a session.
    </Text>
  </>
);

export { CoreDataModel };
