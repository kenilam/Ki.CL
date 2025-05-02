// Components
import { AnimationProps, HeadingProps, TextProps } from '@/Components';

// Icons
import { IconType } from '@/Icons';

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
  level?: Level;
  message?: TextProps['children'];
  title?: HeadingProps['children'];
};
