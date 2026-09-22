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

// Hooks
import { Props as MatchPatternProps, useMatchPattern } from './use-match-pattern';

// Components
import { ErrorElement } from './error-element';
import * as HttpStatus from './http-status';
import { MatchedRoute } from './matched-route';

const Router: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const router = createBrowserRouter(createRoutesFromElements(children));

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
  useLocation,
  useMatch,
  useMatchPattern,
  useNavigate,
  useParams,
  useRoutes,
  useSearchParams,
  Router,
  type LinkProps,
  type NavLinkProps,
  type MatchPatternProps,
  type NavigateProps,
  type PathMatch,
  type ScrollRestorationProps,
};
