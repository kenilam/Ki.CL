import { ComponentType } from 'react';
import { NavLinkProps } from 'react-router-dom';

export type ClassName = ClassNames<'default' | 'active'>;

export type Props = NavLinkProps & {
  className?: string;
  component?: ComponentType<unknown>;
};
