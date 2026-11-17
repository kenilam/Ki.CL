import * as Si from 'react-icons/si';

import type { IconType } from 'design/icons';

import type { Organisation } from '@/views/resume/content';

const LOGOS: Record<Organisation, IconType> = {
  apple: Si.SiApple,
  ebay: Si.SiEbay,
  indeed: Si.SiIndeed,
  rakuten: Si.SiRakuten,
  tesla: Si.SiTesla,
};

export { LOGOS };
