import React, { useEffect, useState, DependencyList } from "react";
import Spec from "./spec";

const AudioPlayer = ({ url }: Spec.Props) => {
  const [index]: Spec.IndexState = useState(0);
  const [tracks, updateTracks]: Spec.TracksState = useState();

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(
    () => {
      if (tracks) {
        return;
      }

      window
        .fetch(url, { signal })
        .then((response) => response.json())
        .then((tracks) => {
          updateTracks(tracks);
        });

      return () => {
        controller.abort();
      };
    },
    [tracks] as DependencyList
  );

  return (
    <video controls={false} autoPlay={true}>
      <source
        src={`${process.env.API_URL}${tracks ? tracks[index].url : null}`}
        type="audio/mpeg"
      />
    </video>
  );
};

export default AudioPlayer;
