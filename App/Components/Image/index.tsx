import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/Icons';

// Components
import { Animation, Layout, Spinner } from '@/Components';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--image';

const Image: React.FunctionComponent<Spec.Props> = ({
  alt,
  data,
  isFullscreen = false,
  loading = 'lazy',
  title,
  placeholder = (
    <Ri.RiFileUnknowLine
      className={classNames('kicl-color-warning', 'kicl-font-size-large')}
    />
  ),
  onError: errorHandler,
  onLoad: loadHandler,
  onResize: resizeHandler,
  ...props
}) => {
  const [loadingState, isLoading] = useState(!!data);
  const [error, setError] = useState<Error>();

  const className = classNames(
    CLASS_NAME,
    {
      [`${CLASS_NAME}--is-fullscreen`]: isFullscreen,
      [`${CLASS_NAME}--is-loading`]: loadingState,
      [`${CLASS_NAME}--has-error`]: !!error,
    },
    props.className
  );

  const onError: Spec.Props['onError'] = (event) => {
    isLoading(false);
    setError(new Error('Error while loading this image'));

    event.currentTarget.remove();

    errorHandler?.(event);
  };

  const onLoad: Spec.Props['onLoad'] = (event) => {
    isLoading(false);
    setError(undefined);

    loadHandler?.(event);
  };

  const onResize: Spec.Props['onResize'] = (event) => {
    resizeHandler?.(event);
  };

  return (
    <Layout
      alignContent='center'
      alignItems='center'
      justifyContent='center'
      justifyItems='center'
    >
      <object
        {...props}
        className={className}
        title={title || alt || error?.message}
      >
        <img
          src={data}
          alt={alt}
          loading={loading}
          onResize={onResize}
          onLoad={onLoad}
          onError={onError}
        />
        <Animation
          in={!loadingState && !!error}
          animationDuration='faster'
          animationStyle='blur'
        >
          <Layout>
            <span className={`${CLASS_NAME}--error`} data-src={data}>
              {placeholder}
            </span>
          </Layout>
        </Animation>
        <Spinner
          in={loadingState && !error}
          animationDuration='faster'
          size='smaller'
        />
      </object>
    </Layout>
  );
};

type ImageProps = Spec.Props;

export { type ImageProps };
export default Image;
