import React from 'react';
import { ApolloClient } from '@apollo/client';
interface KiclProviderProps {
  uri?: string;
  /** WebSocket URL. Defaults to uri with http→ws. */
  wsUri?: string;
  children: React.ReactNode;
}
export declare function getKiclClient(
  uri?: string,
  wsUri?: string
): ApolloClient;
export declare function KiclProvider({
  uri,
  wsUri,
  children,
}: KiclProviderProps): React.JSX.Element;
export {};
