import React from 'react';
import { FormProvider, type FieldValues } from 'react-hook-form';
import classNames from 'classnames';

import type { FormProps } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--form';

function Form<TFieldValues extends FieldValues>({
  children,
  className,
  onSubmit,
  ...form
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form
        className={classNames(CLASS_NAME, className)}
        onSubmit={onSubmit ?? ((event) => event.preventDefault())}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
