import React, { Suspense } from 'react';

const Dialog = React.lazy(async () => {
  const { Contact } = await import('./contact');

  return { default: Contact };
});

/** The contact dialog, in its own chunk: most visits never open it. */
const Contact: React.FunctionComponent = () => (
  <Suspense fallback={null}>
    <Dialog />
  </Suspense>
);

export { Contact };
