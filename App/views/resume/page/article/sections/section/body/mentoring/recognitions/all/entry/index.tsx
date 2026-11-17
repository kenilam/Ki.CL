import React from 'react';

import * as Tb from 'react-icons/tb';

import {
  Badge,
  HyperLink,
  Image,
  Layout,
  ListItem,
  Text,
} from 'design/components';

import { useRecognition } from '@/views/resume/page/article/sections/section/body/mentoring/recognitions/use-recognition';

import type { Recognition } from '@/views/resume/page/article/sections/section/body/mentoring/recognitions/constants';

type Props = Pick<Recognition, 'certificate'>;

const Entry: React.FunctionComponent<Props> = ({ certificate }) => {
  const recognition = useRecognition(certificate);

  return (
    <ListItem>
      <Layout
        alignItems='center'
        autoFlow='column'
        frames='max-content--auto--max-content'
        gap='normal'
      >
        <HyperLink
          className='kicl-inline-size-full'
          to={recognition.to}
          unstyled
        >
          <Image alt='' data={recognition.image} loading='lazy' />
          <Layout autoFlow='row' gap='none'>
            <span>
              <Text dense is='span' lookLike='strong'>
                {recognition.title}
              </Text>
              <Badge variant='secondary' level='confirm'>
                {recognition.period}
              </Badge>
            </span>
          </Layout>
          <Tb.TbArrowUpRight aria-hidden className='kicl-rtl-mirror' />
        </HyperLink>
      </Layout>
    </ListItem>
  );
};

export { Entry };
