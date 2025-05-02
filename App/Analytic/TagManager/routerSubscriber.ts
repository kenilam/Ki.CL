import TagManager from 'react-gtm-module';
import { createBrowserRouter } from 'react-router-dom';

const DATA_LAYER_NAME = 'PageChange';

type Props = Parameters<
  ReturnType<typeof createBrowserRouter>['subscribe']
>[number];

const routerSubscriber: Props = (state) => {
  const dataLayer = {
    ...state.location,
    action: state.historyAction,
  };

  TagManager.dataLayer({
    dataLayer,
    dataLayerName: DATA_LAYER_NAME,
  });
};

export default routerSubscriber;
