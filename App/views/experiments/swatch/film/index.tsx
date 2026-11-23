import React from 'react';

// Libraries
import classNames from 'classnames';

// API
import { Kicl_SwatchDocument, useQuery } from 'api/client';

// Components
import { Image, Video } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';
import { usePlay } from './use-play';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/swatch/constants';

const CLASS_NAME = `${VIEW}__film`;

type Props = { id: string };

const Film: React.FunctionComponent<Props> = ({ id }) => {
  const { prefersReducedMotion } = useResponsive();
  const { data } = useQuery(Kicl_SwatchDocument, {
    fetchPolicy: 'cache-first',
    variables: { id },
  });
  const still = data?.swatch?.still;
  const video = data?.swatch?.video;
  const ref = usePlay(video, data?.swatch?.audio);

  if (!still) {
    return null;
  }

  const className = classNames(
    CLASS_NAME,
    'kicl-inset-0',
    'kicl-pointer-events-none',
    'kicl-position-absolute'
  );

  if (!video || prefersReducedMotion) {
    return <Image alt='' className={className} data={still} />;
  }

  return (
    <Video
      aria-hidden
      autoPlay
      className={className}
      loop
      muted
      playsInline
      poster={still}
      ref={ref}
      src={video}
    />
  );
};

export { Film };
