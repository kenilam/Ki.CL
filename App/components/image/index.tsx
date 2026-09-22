import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { Animation, Layout, Spinner } from '@/components';

// Styles
import './styles.scss';

// Spec
import * as Spec from './spec';

const CLASS_NAME = 'kicl--components--image';

type Result = { src: string; failed: boolean };

const Image: React.FunctionComponent<Spec.Props> = ({
  alt,
  borderRadius = 'sm',
  className: _className,
  data,
  isFullscreen = false,
  loading = 'lazy',
  placeholder = (
    <Ri.RiFileUnknowLine
      className={classNames('kicl-color-warning', 'kicl-font-size-large')}
    />
  ),
  onError: errorHandler,
  onLoad: loadHandler,
  ...props
}) => {
  // Keyed by `src`, so a new `data` starts loading again without an effect.
  const [result, setResult] = useState<Result>();

  const isSettled = !!data && result?.src === data;
  const hasError = isSettled && result.failed;
  const isLoading = !!data && !isSettled;

  const className = classNames(
    CLASS_NAME,
    {
      [`${CLASS_NAME}--is-fullscreen`]: isFullscreen,
      [`${CLASS_NAME}--is-loading`]: isLoading,
      [`${CLASS_NAME}--has-error`]: hasError,
    },
    _className
  );

  const onError: Spec.Props['onError'] = (event) => {
    if (data) setResult({ src: data, failed: true });

    errorHandler?.(event);
  };

  const onLoad: Spec.Props['onLoad'] = (event) => {
    if (data) setResult({ src: data, failed: false });

    loadHandler?.(event);
  };

  return (
    <span {...props} className={className}>
      {!hasError && (
        <img
          className={classNames({
            [`kicl-border-radius-${borderRadius}`]: borderRadius,
          })}
          src={data}
          alt={alt}
          loading={loading}
          onLoad={onLoad}
          onError={onError}
        />
      )}
      {hasError && alt && <span className='kicl-hidden'>{alt}</span>}
      <Animation in={hasError} duration='faster' property='blur'>
        <Layout>
          <span aria-hidden className={`${CLASS_NAME}--error`} data-src={data}>
            {placeholder}
          </span>
        </Layout>
      </Animation>
      <Spinner in={isLoading} duration='faster' size='smaller' />
    </span>
  );
};

type ImageProps = Spec.Props;

export { Image, type ImageProps };
