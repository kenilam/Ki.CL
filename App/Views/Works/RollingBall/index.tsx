/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useState } from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Styles
import './styles.scss';

const WebGL = React.lazy(() => import('./WebGL'));

const PATH = 'rolling-ball';

const RollingBall: React.FunctionComponent = () => {
  const [show, shouldShow] = useState(false);

  useEffect(() => {
    window.addEventListener(`${PATH}.entered`, () => {
      shouldShow(true);
    });
  });

  let Contents = <></>;

  if (show) {
    Contents = (
      <Suspense fallback={<></>}>
        <WebGL />
      </Suspense>
    );
  }

  return (
    <object className='kicl--view--works--rolling-ball'>{Contents}</object>
  );
};

const Route = <Origin path={PATH} />;

export { PATH, Route };
export default <Origin path={PATH} element={<RollingBall />} />;
