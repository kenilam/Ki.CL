import IContact from '@/View/Contact/spec';
import Actions from './Actions';
import RenderFields from './RenderFields';
import { useEffect } from 'react';

const State = (initial: IContact.RenderField) => {
  const actions = Actions();
  const renderFields = RenderFields(initial);

  useEffect(() => {
    renderFields.addValue(initial);

    addEventListener('contact.entering', renderFields.onInit);
    addEventListener('contact.exit', renderFields.onExit);

    return () => {
      renderFields.onUnmount();

      removeEventListener('contact.entering', renderFields.onInit);
      removeEventListener('contact.exit', renderFields.onExit);
    };
  }, [renderFields.values.length === 0]);

  return { actions, renderFields };
};

export default State;
