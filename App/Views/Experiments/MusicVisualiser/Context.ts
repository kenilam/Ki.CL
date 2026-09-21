import { createContext, useContext } from 'react';

// Spec
import type { Track } from './Spec';

// Hooks
import type { Radio } from './useRadio';

/*
 * What the shell shares with the routes beneath it. The radio is made once
 * in the shell, so the engine and the picture outlive every change of
 * route; the track is resolved by the track route and read by its gate and
 * its player.
 */

const RadioContext = createContext<Radio | null>(null);
const TrackContext = createContext<Track | null>(null);

function useRadioContext(): Radio {
  const radio = useContext(RadioContext);

  if (!radio) {
    throw new Error('Music Visualiser: no radio above this route');
  }

  return radio;
}

function useTrackContext(): Track {
  const track = useContext(TrackContext);

  if (!track) {
    throw new Error('Music Visualiser: no track above this route');
  }

  return track;
}

export { RadioContext, TrackContext, useRadioContext, useTrackContext };
