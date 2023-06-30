import React, { type PropsWithChildren } from 'react';

// Libraries
import {
  type NavLinkProps,
  NavLink,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  useLocation,
  useMatch,
  useMatches,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

// Components
import ErrorElement from './ErrorElement';

const Router: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const router = createBrowserRouter(createRoutesFromElements(children));

  return <RouterProvider router={router} />;
};

export {
  ErrorElement,
  NavLink,
  Outlet,
  Route,
  Routes,
  redirect,
  type NavLinkProps,
  useLocation,
  useMatch,
  useMatches,
  useNavigate,
  useSearchParams,
};

export default Router;
