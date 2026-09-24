import React from 'react';

// Components
import { Button, Text } from '@/components';

// Hooks
import { useTheme } from '@/hooks';

// Icons
import { Ri } from '@/icons';

const CLASS_NAME = 'kicl--widgets--global-header--theme';

const COPY = {
  dark: 'Dark theme',
};

const Theme: React.FunctionComponent = () => {
  const { setTheme, theme } = useTheme();

  const isDark = theme === 'dark';

  const Icon = isDark ? Ri.RiSunLine : Ri.RiMoonLine;

  return (
    <Button
      aria-pressed={isDark}
      className={`kicl-font-size ${CLASS_NAME}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      unstyled
    >
      <Icon aria-hidden />
      <Text className='kicl-hidden' is='span'>
        {COPY.dark}
      </Text>
    </Button>
  );
};

export { Theme };
