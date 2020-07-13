import { SyntheticEvent } from 'react';

export type Index = number;
export type UpdateIndex = (props: Index) => void;
export type IndexState = [Index, UpdateIndex];

export type Tracks = unknown[];
export type UpdateTracks = (props: Tracks) => void;
export type TracksState = [Tracks, UpdateTracks];

export type Events = SyntheticEvent<HTMLAudioElement, Event>;

export type Props = {
  onAbort?: (event: Events) => void;
  onListen?: (event: Events) => void;
  onPause?: (event: Events) => void;
  onPlay?: (event: Events) => void;
  volume?: number;
  url: string;
};
