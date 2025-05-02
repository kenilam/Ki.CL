import TagManager from 'react-gtm-module';

import ctaHandler from './ctaHandler';
import routerSubscriber from './routerSubscriber';

const init = () => {
  TagManager.initialize({
    gtmId: import.meta.env.GA_TAG_MANAGER_ID,
  });
};

export { init, ctaHandler, routerSubscriber };
export default {};
