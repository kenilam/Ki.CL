import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  ColorPicker,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormContext,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useNearest } from '@/views/experiments/swatch/maker/make/pick/use-nearest';

// Context
import type { PickValues } from '@/views/experiments/swatch/maker/context';

// Styles
import './styles.scss';

// Constants
import { FIELD } from '@/views/experiments/swatch/maker/make/pick/constants';

const Field: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const { control } = useFormContext<PickValues>();
  const nearest = useNearest();

  return (
    <FormField
      control={control}
      name='hex'
      render={({ field: { onChange, value } }) => (
        <FormItem
          className={classNames(
            FIELD,
            'kicl-padding-block-narrow',
            'kicl-position-sticky',
            'kicl-stuck-line-end',
            'kicl-z-index-raised'
          )}
        >
          <FormLabel>{t('label', { context: 'color' })}</FormLabel>
          <FormControl>
            <ColorPicker
              onValueChange={(hex) => {
                onChange(hex);
                nearest(hex);
              }}
              presentation='widget'
              value={value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Field };
