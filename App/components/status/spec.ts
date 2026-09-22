// Components
import { AnimationProps, HeadingProps, TextProps } from '@/components';
import type { HeadingIs } from '@/components/heading/spec';

// Icons
import { IconType } from '@/icons';

type Level = 'error' | 'info' | 'warning';

export type Align = 'center' | 'end' | 'start';

export type Icons = {
  [level in Level]: ReturnType<IconType>;
};

export type Titles = {
  [level in Level]: string;
};

export type Props = AnimationProps & {
  align?: Align;
  /** Outline level of the title. It keeps the `h4` size whatever the level. */
  headingLevel?: HeadingIs;
  level?: Level;
  message?: TextProps['children'];
  title?: HeadingProps['children'];
};
