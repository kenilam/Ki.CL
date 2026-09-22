import React from 'react';

export type ObjectFit = 'cover' | 'fill';

export type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  objectFit?: ObjectFit;
};
