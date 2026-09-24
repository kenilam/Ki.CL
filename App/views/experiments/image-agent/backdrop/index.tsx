import React from 'react';

// Libraries
import classNames from 'classnames';

// API
import { Kicl_ImageAgentGalleryDocument, useQuery } from 'api/provider';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/image-agent/constants';

const CLASS_NAME = `${VIEW}__backdrop`;

/** How many of the best-scored pictures to fetch. The API allows 24. */
const PICTURES = 24;

type Props = {
  /** Darken and mute the pictures so text on them stays readable. */
  scrim?: boolean;
};

/**
 * The preview picture with the best-scored pictures the agent has drawn
 * stacked over it and blended in, each drifting on scroll. The preview shows
 * on its own until they load. Fills the nearest positioned parent.
 */
const Backdrop: React.FunctionComponent<Props> = ({ scrim }) => {
  const { data } = useQuery(Kicl_ImageAgentGalleryDocument, {
    variables: { limit: PICTURES },
  });
  const urls = data?.ImageAgentGallery.map(({ url }) => url) ?? [];

  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        { [`${CLASS_NAME}--scrim`]: scrim },
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
      style={{ [`--${CLASS_NAME}--count`]: urls.length } as React.CSSProperties}
    >
      {urls.map((url) => (
        <span
          className={classNames(
            `${CLASS_NAME}__picture`,
            'kicl-position-absolute'
          )}
          key={url}
          style={
            { [`--${CLASS_NAME}--url`]: `url('${url}')` } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
};

export { Backdrop };
