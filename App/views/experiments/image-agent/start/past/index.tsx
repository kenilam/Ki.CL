import React, { useId } from 'react';

// Libraries
import Highlighter from 'react-highlight-words';

// Icons
import { Ri } from '@/icons';

// Components
import { Heading, HyperLink, Layout, List, ListItem } from '@/components';

// Hooks
import { usePast } from './use-past';

// Constants
import { toLabel, toPath } from '@/views/experiments/image-agent/constants';

const COPY = {
  title: 'Past conversations',
};

type Props = {
  /**
   * Text from the field. Only conversations containing every word are shown.
   */
  query: string;
};

/** Earlier conversations to go back to, narrowed by what is being typed. */
const Past: React.FunctionComponent<Props> = ({ query }) => {
  const id = useId();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const threads = usePast().filter((thread) => {
    const said = [thread.brief, ...thread.messages.map(({ text }) => text)]
      .join(' ')
      .toLowerCase();
    return words.every((word) => said.includes(word));
  });

  if (!threads.length) {
    return null;
  }

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' dense>
          {COPY.title}
        </Heading>
        <List gap='narrower'>
          {threads.map((thread) => (
            <ListItem key={thread.id}>
              <HyperLink
                after={<Ri.RiArrowRightSLine aria-hidden />}
                className='kicl-font-size-small'
                to={toPath(thread.id)}
              >
                <Highlighter
                  autoEscape
                  searchWords={words}
                  textToHighlight={toLabel(thread)}
                />
              </HyperLink>
            </ListItem>
          ))}
        </List>
      </section>
    </Layout>
  );
};

export { Past };
