import resources from '$/resources';
import { Button } from '@/Component'
import { types } from '@/Component/CSSTransition/Type';
import React from 'react';
import Style from './Style';
import Spec from './spec';

const transitionType = types.SlideUp;

const {
  view: {
    contact: {
      content
    },
  },
} = resources;

const reset = content.reset as { value: string };
const submit = content.submit as { value: string };

const CTA: React.FunctionComponent<Spec.Props> = ({ disabled, ...props }) => (
  <fieldset data-view-component={Style.default}>
    <Button {...props} transitionType={transitionType} type='reset'>
      {reset.value}
    </Button>
    <Button
      {...props}
      transitionType={transitionType}
      type='submit'
      disabled={disabled}
    >
      {submit.value}
    </Button>
  </fieldset>
);

export default CTA;
