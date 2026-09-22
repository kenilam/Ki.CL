import React from 'react';

export type Context = {
  showHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Props = {
  show?: boolean;
};
