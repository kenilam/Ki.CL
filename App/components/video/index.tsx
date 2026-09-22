import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Spinner } from '@/components';

// Spec
import * as Spec from './spec';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--components--video';

type VideoElement = HTMLElement;

const Video = React.forwardRef<VideoElement, Spec.Props>(
  (
    {
      autoPlay = true,
      captions,
      className: _className,
      controls = false,
      controlsList = 'nofullscreen nodownload',
      height = 'auto',
      loop = true,
      muted = true,
      objectFit,
      onLoadedData: loadDataHandler,
      onLoadStart: loadStartHandler,
      playsInline = true,
      preload = 'auto',
      src,
      width = 'auto',
      ...rest
    },
    ref
  ) => {
    const [loading, isLoading] = useState(true);

    const onLoadedData: Spec.Props['onLoadedData'] = (event) => {
      isLoading(false);

      loadDataHandler?.(event);
    };

    const onLoadStart: Spec.Props['onLoadStart'] = (event) => {
      isLoading(true);

      loadStartHandler?.(event);
    };

    const className = classNames(
      CLASS_NAME,
      'kicl-position-relative',
      {
        [`${CLASS_NAME}--object-fit--${objectFit}`]: !!objectFit,
      },
      _className
    );

    return (
      <Layout
        alignContent='stretch'
        alignItems='stretch'
        justifyContent='stretch'
        justifyItems='stretch'
        ref={ref}
      >
        <figure className={className}>
          {/* Muted by default; a video with speech passes `captions`. */}
          {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            {...rest}
            autoPlay={autoPlay}
            controls={controls}
            controlsList={controlsList}
            height={height}
            loop={loop}
            muted={muted}
            onLoadStart={onLoadStart}
            onLoadedData={onLoadedData}
            playsInline={playsInline}
            preload={preload}
            width={width}
          >
            <source src={src} type='video/mp4' />
            {captions ? (
              <track default kind='captions' src={captions} srcLang='en' />
            ) : null}
          </video>
          <Spinner in={loading} />
        </figure>
      </Layout>
    );
  }
);

Video.displayName = 'Video';

type VideoProps = Spec.Props;

export { Video, type VideoElement, type VideoProps };
