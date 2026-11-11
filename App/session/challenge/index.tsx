import React from 'react';

// Components
import { Dialog, Layout } from 'design/components';

// Context
import { useSessionContext } from '@/session/context';

// Partials
import { Message } from './message';
import { Title } from './title';
import { Turnstile } from './turnstile';

// Constants
import { MESSAGE_ID, TITLE_ID } from './constants';

const Challenge: React.FunctionComponent = () => {
  const { resuming, stage } = useSessionContext();

  if (!resuming) {
    return null;
  }

  return (
    <Dialog
      aria-describedby={MESSAGE_ID}
      aria-labelledby={TITLE_ID}
      closable={false}
      open={stage === 'challenge'}
      role='alertdialog'
    >
      <Layout
        alignContent='center'
        alignItems='center'
        justifyContent='center'
        justifyItems='center'
      >
        <section className='kicl-padding-block-end-wide'>
          <Title />
          <Message />
          <Turnstile />
        </section>
      </Layout>
    </Dialog>
  );
};

export { Challenge };
