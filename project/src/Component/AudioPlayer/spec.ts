import { SyntheticEvent } from 'react';

declare namespace IAudio {
  type Index = number;
  type UpdateIndex = (props: Index) => void;
  type IndexState = [Index, UpdateIndex];

  type Tracks = any[];
  type UpdateTracks = (props: Tracks) => void;
  type TracksState = [Tracks, UpdateTracks];

  interface Events extends SyntheticEvent<HTMLAudioElement, Event> {}

  interface Props {
    onAbort?: (event: Events) => void;
    onListen?: (event: Events) => void;
    onPause?: (event: Events) => void;
    onPlay?: (event: Events) => void;
    volume?: number;
    url: string;
  }
}

export default IAudio;
