// API
import { Kicl_SwatchExamplesDocument, useQuery } from 'api/provider';

// Hooks
import { useResponsive } from 'design/hooks';

// Helpers
import { isLight } from './color';

const usePreset = () => {
  const { theme } = useResponsive();
  const { data } = useQuery(Kicl_SwatchExamplesDocument);

  if (!data) {
    return undefined;
  }

  const examples = data.swatchExamples;
  const matches = examples.find(
    ({ hex }) => hex !== null && isLight(hex) === (theme === 'light')
  );

  return matches ?? examples[0] ?? null;
};

export { usePreset };
