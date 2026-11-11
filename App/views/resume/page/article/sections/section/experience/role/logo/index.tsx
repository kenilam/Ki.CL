import React from 'react';

// Icons
import type { IconType } from 'design/icons';
import * as Si from 'react-icons/si';

// Routes
import { useParams } from 'design/router';

// Content
import {
  findVersion,
  type Organisation,
  type Resolved,
} from '@/views/resume/content';

// Context
import { useVersion } from '@/views/resume/context';

type Props = Pick<Resolved['experience'][number], 'dates'>;

const LOGOS: Record<Organisation, IconType> = {
  apple: Si.SiApple,
  ebay: Si.SiEbay,
  indeed: Si.SiIndeed,
  rakuten: Si.SiRakuten,
  tesla: Si.SiTesla,
};

const Logo: React.FunctionComponent<Props> = ({ dates }) => {
  const { version: slug } = useParams();
  const { experience } = useVersion();

  const position = experience.findIndex((each) => {
    return each.dates === dates;
  });
  const id = findVersion(slug)?.experience[position]?.organisation;

  if (!id) {
    return null;
  }

  const Icon = LOGOS[id];

  return <Icon aria-hidden className='kicl-print-hidden' />;
};

export { Logo };
