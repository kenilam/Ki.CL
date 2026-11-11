import React, { Suspense } from 'react';

// Routes
import { Outlet as Origin } from 'design/router';

// Partials
import { SignOut } from '@/views/account/sign-out';
import { Contact } from '@/views/contact';

// Kept out of the first load: it brings in a part of each experiment.
const Notifications = React.lazy(async () => {
  const { Notifications } = await import('@/views/notifications');

  return { default: Notifications };
});

const Outlet: React.FunctionComponent = () => {
  return (
    <>
      <Origin />
      {/* Here, not in a menu or a page: any page's button opens them, with the menus closed. */}
      <SignOut />
      <Contact />
      <Suspense fallback={null}>
        <Notifications />
      </Suspense>
    </>
  );
};

export { Outlet };
