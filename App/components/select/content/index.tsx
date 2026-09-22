import React from 'react';

// Styles
import './styles.scss';

import type { SelectContentProps } from '@/components/select/spec';

/**
 * The options sit straight inside the `<select>` - a wrapper would hide them
 * from browsers without base-select. The picker is styled with
 * `::picker(select)`.
 */
const SelectContent: React.FunctionComponent<SelectContentProps> = ({
  children,
}) => <>{children}</>;

SelectContent.displayName = 'SelectContent';

export { SelectContent };
