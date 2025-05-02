// Libraries
import { TrackDetails } from 'keen-slider/react';

type Scale = {
  details?: TrackDetails;
  index: number;
};

const SCALE_RADIUS = 0.7;

const scale = ({ details, index }: Scale) => {
  if (!details) {
    return {};
  }

  const slide = details.slides[index];

  const scale = 1 - (SCALE_RADIUS - SCALE_RADIUS * slide.portion);

  return {
    transform: `scale(${scale})`,
    WebkitTransform: `scale(${scale})`,
  };
};

export default scale;
