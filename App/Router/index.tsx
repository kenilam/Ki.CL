import React, { PropsWithChildren } from 'react';

// Libraries
import {
  Link,
  LinkProps,
  NavLink,
  NavLinkProps,
  Navigate,
  NavigateProps,
  Outlet,
  PathMatch,
  Route,
  RouterProvider,
  Routes,
  ScrollRestoration,
  ScrollRestorationProps,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useRoutes,
  useSearchParams,
} from 'react-router-dom';

// Analytic
import { TagManager } from '@/Analytic';

// Hooks
import useMatchPattern, { Props as MatchPatternProps } from './useMatchPattern';

// Components
import ErrorElement from './ErrorElement';
import * as HttpStatus from './HttpStatus';
import MatchedRoute from './MatchedRoute';

const Router: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const router = createBrowserRouter(createRoutesFromElements(children));

  router.subscribe(TagManager.routerSubscriber);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export {
  ErrorElement,
  HttpStatus,
  Link,
  MatchedRoute,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  ScrollRestoration,
  redirect,
  type LinkProps,
  type NavLinkProps,
  type MatchPatternProps,
  type NavigateProps,
  type PathMatch,
  type ScrollRestorationProps,
  useLocation,
  useMatch,
  useMatchPattern,
  useNavigate,
  useParams,
  useRoutes,
  useSearchParams,
};

export default Router;
