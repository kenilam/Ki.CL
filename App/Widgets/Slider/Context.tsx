import React, { PropsWithChildren, useContext, useState } from 'react';

// Libraries
import {
  useKeenSlider,
  KeenSliderInstance,
  KeenSliderHooks,
  KeenSliderOptions,
  TrackDetails,
} from 'keen-slider/react';
// Constants
import { OPTIONS } from './constants';

// Spec
import * as Spec from './Spec';

type Ref = ReturnType<typeof useKeenSlider>[0];
type Instance = React.MutableRefObject<KeenSliderInstance<
  object,
  object,
  KeenSliderHooks
> | null>;

type Props = Pick<Spec.Props, 'style'> & {
  currentSlide: number;
  details?: TrackDetails;
  instance?: Instance;
  ref: Ref;
};

const DEFAULT: Props = {
  currentSlide: 0,
  details: undefined,
  instance: undefined,
  ref(_: HTMLElement | null) {
    return undefined;
  },
  style: undefined,
};

const Context = React.createContext(DEFAULT);

const SliderProvider: React.FunctionComponent<
  PropsWithChildren<Spec.Props>
> = ({ children, style, ...rest }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(
    DEFAULT.currentSlide
  );
  const [details, setDetails] = React.useState<TrackDetails>();

  const options: KeenSliderOptions = {
    ...OPTIONS,
    ...rest,
    slides: {
      ...(typeof OPTIONS.slides === 'object' ? OPTIONS.slides : {}),
      ...(typeof rest.slides === 'object' ? rest.slides : {}),
    },
    detailsChanged(slider) {
      setDetails(slider.track.details);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  };

  const [ref, instance] = useKeenSlider(options);

  const value = {
    currentSlide,
    details,
    instance,
    style,
    ref,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useSliderContext = () => {
  const Contexts = useContext(Context);

  return Contexts;
};

export { useSliderContext };
export default SliderProvider;
