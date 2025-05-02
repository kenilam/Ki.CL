import TagManager from 'react-gtm-module';

const DATA_LAYER_NAME = 'CTA';

type Props = {
  action: string;
  label: string;
};

const ctaHandler = (dataLayer: Props) => {
  TagManager.dataLayer({
    dataLayer,
    dataLayerName: DATA_LAYER_NAME,
  });
};

export default ctaHandler;
