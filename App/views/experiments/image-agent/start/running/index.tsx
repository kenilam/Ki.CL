import React, { useId } from 'react';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import {
  Animation,
  Heading,
  HyperLink,
  Layout,
  List,
  ListItem,
  Spinner,
} from 'design/components';

// Hooks
import type { RunningState } from './use-running';

// Constants
import { toLabel, toPath } from '@/views/experiments/image-agent/constants';

const COPY = {
  title: 'In progress',
  elsewhere:
    'A conversation from another session on this network is still running.',
};

/**
 * Conversations with a turn still running. Renders nothing when there are none.
 */
const Running: React.FunctionComponent<RunningState> = ({ busy, running }) => {
  const id = useId();

  if (!busy) {
    return null;
  }

  return (
    <Animation property='slide-from-bottom'>
      <Layout autoFlow='row' gap='none' justifyItems='start'>
        <section aria-labelledby={id}>
          <Layout autoFlow='column' gap='narrow'>
            <Heading id={id} is='h2' dense>
              <Spinner position='inline' />
              {COPY.title}
            </Heading>
          </Layout>
          <List gap='narrow'>
            {running.map((thread) => (
              <ListItem key={thread.id}>
                <HyperLink
                  after={<Ri.RiArrowRightSLine aria-hidden />}
                  to={toPath(thread.id)}
                >
                  {toLabel(thread)}
                </HyperLink>
              </ListItem>
            ))}
          </List>
        </section>
      </Layout>
    </Animation>
  );
};

export { Running };
