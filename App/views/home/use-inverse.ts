import {
  DARK_THEME_CLASS_NAME,
  LIGHT_THEME_CLASS_NAME,
  useResponsive,
} from 'design/hooks';

const INVERSE = {
  dark: LIGHT_THEME_CLASS_NAME,
  light: DARK_THEME_CLASS_NAME,
};

const useInverse = () => {
  const { theme } = useResponsive();

  return INVERSE[theme];
};

export { useInverse };
