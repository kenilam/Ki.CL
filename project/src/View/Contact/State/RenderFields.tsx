import ICSSTransition from '@/Component/CSSTransition/spec';
import IContact from '@/View/Contact/spec';
import { useState } from 'react';

const DEBOUNCE_DURATION = 300;

const RenderFields = (initialRenderField: IContact.RenderField) => {
  let renderFieldsTimer: number;
  const [values, updateValues] = useState<IContact.RenderField[]>([]);

  const addValue = (
    renderField: IContact.RenderField,
    debounce: boolean = true
  ) => {
    const update = () =>
      updateValues(Array.from(new Set([...values, renderField])));

    if (debounce) {
      return () => {
        clearTimeout(renderFieldsTimer);

        renderFieldsTimer = window.setTimeout(update, DEBOUNCE_DURATION);
      };
    }

    update();
  };

  const shouldRender = (renderField: IContact.RenderField) =>
    values.includes(renderField);

  const onInit = () => {
    addValue(initialRenderField, false);
  };

  const onExit = () => {
    updateValues([]);
  };

  const onUnmount = () => {
    clearTimeout(renderFieldsTimer);
  };

  const createState = ({
    renderFields,
    transitionType,
  }: {
    renderFields: IContact.RenderField[];
    transitionType?: ICSSTransition.Type;
  }) => {
    const values: {
      in: ICSSTransition.In;
      onEntering?: ICSSTransition.OnEnter;
      transitionType?: ICSSTransition.Type;
    } = {
      in: shouldRender(renderFields[0]),
    };

    if (renderFields[1]) {
      values.onEntering = addValue(renderFields[1]);
    }

    if (transitionType) {
      values.transitionType = transitionType;
    }

    return values;
  };

  return {
    addValue,
    createState,
    onExit,
    onInit,
    onUnmount,
    shouldRender,
    values,
  };
};

export default RenderFields;
