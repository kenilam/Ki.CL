import React from 'react';

// Components
import { SheetFooter } from 'design/components';

// Partials
import { Pile } from './pile';
import { Proceed } from './proceed';
import { Save } from './save';
import { Shapes } from './shapes';

/**
 * Sets the cell up by hand: obstacles go straight onto the stage, and the
 * cases are built as set here when the operator proceeds. The obstacles as
 * they stand now and the case settings save together as a preset.
 */
const Manual: React.FunctionComponent = () => {
  return (
    <>
      <Shapes />
      <Pile />

      {/* Full width each, the footer's row shares them out in equal halves. */}
      <SheetFooter>
        <Save />
        <Proceed />
      </SheetFooter>
    </>
  );
};

export { Manual };
