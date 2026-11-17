import React, { Suspense } from 'react';

const Dialog = React.lazy(async () => {
  const { Dialog } = await import('./dialog');

  return { default: Dialog };
});

const Entry: React.FunctionComponent = () => {
  return (
    <Suspense fallback={null}>
      <Dialog />
    </Suspense>
  );
};

export { Entry };
