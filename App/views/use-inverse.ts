import {
  DARK_THEME_CLASS_NAME,
  LIGHT_THEME_CLASS_NAME,
  usePrinting,
  useResponsive,
} from 'design/hooks';

const INVERSE = {
  dark: LIGHT_THEME_CLASS_NAME,
  light: DARK_THEME_CLASS_NAME,
};

const useInverse = () => {
  const { theme } = useResponsive();
  const printing = usePrinting();

  return printing ? undefined : INVERSE[theme];
};

export { useInverse };
