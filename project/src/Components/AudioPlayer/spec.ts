import { SyntheticEvent } from 'react';

declare module Spec {
  type Index = number;
  type UpdateIndex = (props: Index) => void;
  type IndexState = [Index, UpdateIndex];

  type Tracks = any[];
  type UpdateTracks = (props: Tracks) => void;
  type TracksState = [Tracks, UpdateTracks];

  type Events = SyntheticEvent<HTMLAudioElement, Event>;

  type Props = {
    onAbort?: (event: Events) => void;
    onListen?: (event: Events) => void;
    onPause?: (event: Events) => void;
    onPlay?: (event: Events) => void;
    volume?: number;
    url: string;
  };
}

export default Spec;
