import React from 'react';

import type { SelectLabelProps } from '@/components/select/spec';

/**
 * Names a SelectGroup. The group reads the text into the native optgroup
 * `label`, so nothing is rendered here.
 */
const SelectLabel: React.FunctionComponent<SelectLabelProps> = () => null;

SelectLabel.displayName = 'SelectLabel';

export { SelectLabel };
