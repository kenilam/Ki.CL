import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Utilities
import { pickType, toFileName } from './file';

/** How long a clip is. */
const CLIP_SECONDS = 10;

const FRAME_RATE = 30;

type Clip = {
  /** The last clip could not be recorded. */
  failed: boolean;
  record(): void;
  recording: boolean;
  /** This browser can record the canvas. */
  supported: boolean;
};

function save(blob: Blob, name: string): void {
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}

/** Records the picture and what is playing into a file the listener keeps. */
export function useClip(): Clip {
  const { control, stage, track } = useTrackContext();
  const [failed, setFailed] = useState(false);
  const [recording, setRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  const type = useMemo(
    () =>
      typeof MediaRecorder === 'undefined' ||
      !('captureStream' in HTMLCanvasElement.prototype)
        ? null
        : pickType((candidate) => MediaRecorder.isTypeSupported(candidate)),
    []
  );

  const record = useCallback(() => {
    const sound = control.capture();

    if (!type || !stage.current || !sound || recorder.current) {
      return;
    }

    const picture = stage.current.captureStream(FRAME_RATE);
    const chunks: Blob[] = [];
    const name = toFileName(track, type);
    const timer = window.setTimeout(
      () => recorder.current?.stop(),
      CLIP_SECONDS * 1000
    );
    let done = false;
    const finish = (saved: boolean) => {
      /* A recorder that fails still stops. */
      if (done) {
        return;
      }

      done = true;
      window.clearTimeout(timer);
      /* The sound's tracks belong to the player and stay open. */
      picture.getTracks().forEach((each) => each.stop());
      recorder.current = null;
      setFailed(!saved);
      setRecording(false);
    };

    try {
      const next = new MediaRecorder(
        new MediaStream([...picture.getTracks(), ...sound.getAudioTracks()]),
        { mimeType: type }
      );

      next.ondataavailable = ({ data }) => chunks.push(data);
      next.onerror = () => finish(false);
      next.onstop = () => {
        if (!done) {
          save(new Blob(chunks, { type }), name);
        }

        finish(true);
      };
      next.start();
      recorder.current = next;
      setFailed(false);
      setRecording(true);
    } catch {
      finish(false);
    }
  }, [control, stage, track, type]);

  /* Pausing takes the controls away: keep what was recorded so far. */
  useEffect(() => () => recorder.current?.stop(), []);

  return { failed, record, recording, supported: Boolean(type) };
}

export { CLIP_SECONDS };
