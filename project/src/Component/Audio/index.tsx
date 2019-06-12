import * as IAudio from './spec';
import React, {DependencyList, useEffect, useState} from "react";
import Player from 'react-audio-player';

const MAX_VOLUME = 0.1;

const Audio = ({ onAbort, onListen, onPause, onPlay, volume= 1, url }: IAudio.Props) => {
  const [ index, updateIndex]: IAudio.IndexState = useState(0);
  const [ tracks, updateTracks]: IAudio.TracksState = useState();
  
  const controller = new AbortController();
  const { signal } = controller;
  
  const onEnded = () => {
    updateIndex(index >= tracks.length - 1 ? 0 : index + 1);
  };
  
  useEffect(
    () => {
      if (tracks) {
        return;
      }
      
      window.fetch(url, { signal })
      .then(
        response => response.json()
      )
      .then(
        tracks => {
          updateTracks(tracks);
        }
      );
      
      return () => {
        controller.abort();
      };
    },
    [tracks] as DependencyList
  );
  
  return (
    tracks ? (
      <Player
        autoPlay={true}
        onAbort={onAbort}
        onEnded={onEnded}
        onListen={onListen}
        onPause={onPause}
        onPlay={onPlay}
        volume={volume * MAX_VOLUME}
        src={tracks[index].previewURL}
      />
    ) : null
  );
};

export default Audio;
