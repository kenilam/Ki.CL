import * as Work from '@/API/Work/spec';

export type Match = Work.Match;

export type Param = 'work';

export type Params = {
  [name in Param]: string;
};

export type Props = unknown;
