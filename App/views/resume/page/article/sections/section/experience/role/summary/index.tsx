import React from 'react';

// Components
import { Badge, Layout, Text } from 'design/components';

// Content
import type { Resolved } from '@/views/resume/content';

// Context
import { useVersion } from '@/views/resume/context';

// Constants
import { CLASS_NAME as RESUME } from '@/views/resume/constants';

type Props = Pick<Resolved['experience'][number], 'dates'>;

const Summary: React.FunctionComponent<Props> = ({ dates }) => {
  const role = useVersion().experience.find((each) => {
    return each.dates === dates;
  });

  if (!role) {
    return null;
  }

  return (
    <Layout alignItems='center' display='flex' gap='narrow' wrap>
      <span>
        <Text className='kicl-font-weight-bold' dense is='span'>
          {role.title}
        </Text>
        <Badge className={`${RESUME}__role__dates`} variant='ghost'>
          {dates}
        </Badge>
      </span>
    </Layout>
  );
};

export { Summary };
