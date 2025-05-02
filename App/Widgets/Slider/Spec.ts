import { KeenSliderOptions, TrackDetails } from 'keen-slider/react';

type StyleProps = {
  details?: TrackDetails;
  index: number;
};

type Style = (props: StyleProps) => void;

export type Props = KeenSliderOptions & {
  style?: Style;
};
