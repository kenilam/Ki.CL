import * as IAudio from './spec';
import React, {DependencyList, useEffect, useState} from "react";
import { AudioContext } from 'standardized-audio-context';

const MAX_VOLUME = 0.1;

const AudioPlayer = ({ url }: IAudio.Props) => {
  const [ index ]: IAudio.IndexState = useState(0);
  const [ tracks, updateTracks]: IAudio.TracksState = useState();
  
  const controller = new AbortController();
  const { signal } = controller;
  
  useEffect(
    () => {
      if (tracks) {
        const audioContext = new AudioContext();
        const oscillatorNode = audioContext.createOscillator();
  
        oscillatorNode.connect(audioContext.destination);
        
        window.fetch(`${process.env.API_URL}${tracks[index].url}`, {
          signal, method: 'POST'
        })
        .then(
          response => {
            response.arrayBuffer().then(buffer => {
              audioContext.decodeAudioData(buffer);
            });
          }
        );
        
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
      <video controls={false} autoPlay={true}>
        <source src={`${process.env.API_URL}${tracks[index].url}`} type="audio/mpeg"/>
      </video>
    ) : null
  );
};

export default AudioPlayer;
