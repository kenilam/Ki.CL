import React from 'react';

// Components
import { Form as Origin } from 'design/components';

// Hooks
import { useProfile } from './use-profile';

// Partials
import { Actions } from './actions';
import { Name } from './name';
import { Status } from './status';

const Form: React.FunctionComponent = () => {
  const { form, onSubmit } = useProfile();

  return (
    <Origin {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <Name />
      <Status />
      <Actions />
    </Origin>
  );
};

export { Form };
