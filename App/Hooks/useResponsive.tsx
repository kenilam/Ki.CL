import { useEffect } from 'react';

// Libraries
import { useMediaQuery } from 'react-responsive';

import { CSSUnit } from '@/Helper';

const DARK_THEME_CLASS_NAME = 'kicl--theme--dark';

type Breakpoint = 'desktop' | 'mobile' | 'tablet' | 'wide';

type Breakpoints = {
  [breakpoint in Breakpoint]: ReturnType<typeof CSSUnit>;
};

const root = window.getComputedStyle(document.documentElement);

const breakpoints: Breakpoints = {
  desktop: CSSUnit({
    values: root.getPropertyValue('--kicl-breakpoint-desktop'),
  }),
  tablet: CSSUnit({
    values: root.getPropertyValue('--kicl-breakpoint-tablet'),
  }),
  mobile: CSSUnit({
    values: root.getPropertyValue('--kicl-breakpoint-mobile'),
  }),
  wide: CSSUnit({ values: root.getPropertyValue('--kicl-breakpoint-wide') }),
};

const useResponsive = () => {
  const isDarkColorSchemePrefers = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  });

  useEffect(() => {
    if (isDarkColorSchemePrefers) {
      document.body.classList.add(DARK_THEME_CLASS_NAME);
      return;
    }

    document.body.classList.remove(DARK_THEME_CLASS_NAME);
  }, [isDarkColorSchemePrefers]);

  const isLandscape = useMediaQuery({ query: '(orientation: landscape)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  const isDesktop = useMediaQuery({
    query: `(max-width: ${breakpoints.wide}px)`,
  });
  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpoints.desktop}px)`,
  });
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet}px)`,
  });
  const isNarrow = useMediaQuery({
    query: `(max-width: ${breakpoints.mobile}px)`,
  });
  const isWidescreen = useMediaQuery({
    query: `(min-width: ${breakpoints.wide + 1}px)`,
  });

  return {
    breakpoints,
    isDarkColorSchemePrefers,
    isDesktop: isDesktop || isWidescreen || !isTablet || !isMobile,
    isLandscape,
    isMobile: isMobile || isNarrow,
    isNarrow,
    isPortrait,
    isTablet: isTablet || isMobile,
    isWidescreen,
  };
};

export { DARK_THEME_CLASS_NAME, breakpoints };
export default useResponsive;
