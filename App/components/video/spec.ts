import React from 'react';

export type ObjectFit = 'cover' | 'fill';

export type Props = React.ComponentPropsWithoutRef<'video'> & {
  /** URL of an English WebVTT captions file, for a video with speech. */
  captions?: string;
  objectFit?: ObjectFit;
};
