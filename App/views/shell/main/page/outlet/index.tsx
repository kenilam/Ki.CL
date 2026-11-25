import React, { Suspense } from 'react';

// Routes
import { Outlet as Origin } from 'design/router';

// Partials
import { SignOut } from '@/views/account/sign-out';
import { Contact } from '@/views/contact';
import { Entry as Resume } from '@/views/resume/entry';

// The bell is its own remote, Ki.CL-notifications, kept out of the first load.
const Notification = React.lazy(async () => {
  const { Notification } = await import('notification');

  return { default: Notification };
});

const Outlet: React.FunctionComponent = () => {
  return (
    <>
      <Origin />
      {/* Here, not in a menu or a page: any page's button opens them, with the menus closed. */}
      <SignOut />
      <Contact />
      <Resume />
      <Suspense fallback={null}>
        <Notification />
      </Suspense>
    </>
  );
};

export { Outlet };
