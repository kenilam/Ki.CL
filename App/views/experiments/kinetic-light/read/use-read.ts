import { useCallback, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// API
import {
  Kicl_KineticLightReadDocument,
  Kicl_KineticLightReadingsDocument,
  Kicl_KineticLightSaveDocument,
  useMutation,
  type KineticLightFile,
  type KineticLightSongInput,
} from 'api/provider';

// Session
import { isChallenge, useChallenged } from '@/session';

// Hooks
import { useArrange } from '@/views/experiments/kinetic-light/use-arrange';

// Readers
import { readMidi } from './midi';
import { readMusicXml, unzipMusicXml } from './musicxml';
import { stem, type Piece } from './piece';

const MIDI = 'MThd';
const ZIP = 'PK';
const PICTURES = ['%PDF', '\u0089PNG', 'ÿØÿ', 'GIF8', 'RIFF'];
const SVG_SCALE = 3;

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const signatureOf = (bytes: Uint8Array): string =>
  String.fromCharCode(...bytes.subarray(0, 4));

const toPng = async (file: File): Promise<File> => {
  const url = URL.createObjectURL(file);

  try {
    const image = new Image();

    image.src = url;
    await image.decode();

    const scale = file.type === 'image/svg+xml' ? SVG_SCALE : 1;
    const canvas = document.createElement('canvas');

    canvas.width = image.naturalWidth * scale;
    canvas.height = image.naturalHeight * scale;

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('No canvas');
    }

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );

    if (!blob) {
      throw new Error('No image');
    }

    return new File([blob], file.name, { type: 'image/png' });
  } finally {
    URL.revokeObjectURL(url);
  }
};

function useRead() {
  const { t } = useTranslation('kinetic-light');
  const challenged = useChallenged();
  const [mutate, { loading }] = useMutation(Kicl_KineticLightReadDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [Kicl_KineticLightReadingsDocument],
  });
  const [keep, { loading: saving }] = useMutation(
    Kicl_KineticLightSaveDocument
  );
  const arrange = useArrange();
  const [arranging, setArranging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fail = useCallback(
    (caught: unknown) => {
      if (isChallenge(caught)) {
        return;
      }

      setError(
        caught instanceof Error
          ? caught.message
          : t('error', { context: 'unreadable' })
      );
    },
    [t]
  );

  const save = useCallback(
    async (song: KineticLightSongInput): Promise<string | null> => {
      try {
        const result = await challenged(() => keep({ variables: { song } }));

        return result.data?.kineticLightSave.id ?? null;
      } catch (caught) {
        fail(caught);

        return null;
      }
    },
    [challenged, fail, keep]
  );

  const readPicture = useCallback(
    async (file: File) => {
      try {
        const data = await toBase64(file);
        const result = await challenged(() =>
          mutate({
            variables: {
              file: { data, name: file.name as KineticLightFile['name'] },
            },
          })
        );

        return result.data?.kineticLightRead.id ?? null;
      } catch (caught) {
        fail(caught);

        return null;
      }
    },
    [challenged, fail, mutate]
  );

  const read = useCallback(
    async (file: File) => {
      setError(null);

      const bytes = new Uint8Array(await file.arrayBuffer());
      const signature = signatureOf(bytes);
      const title = stem(file.name) || file.name;

      if (PICTURES.some((picture) => signature.startsWith(picture))) {
        const id = await readPicture(file);

        return id ? { id, ready: false } : null;
      }

      if (file.type.startsWith('image/')) {
        try {
          const id = await readPicture(await toPng(file));

          return id ? { id, ready: false } : null;
        } catch {
          setError(t('error', { context: 'type' }));

          return null;
        }
      }

      let piece: Piece | null = null;
      let music: Pick<KineticLightSongInput, 'midi' | 'musicxml'> = {};

      try {
        if (signature.startsWith(MIDI)) {
          piece = readMidi(bytes.buffer, title);
          music = { midi: await toBase64(file) };
        } else {
          const xml = signature.startsWith(ZIP)
            ? unzipMusicXml(bytes)
            : new TextDecoder().decode(bytes);

          piece = xml ? readMusicXml(xml, title) : null;
          music = { musicxml: xml };
        }
      } catch {
        setError(t('error', { context: 'unreadable' }));

        return null;
      }

      if (!piece) {
        setError(t('error', { context: 'type' }));

        return null;
      }

      if (!piece.notes.length) {
        setError(t('error', { context: 'no_notes' }));

        return null;
      }

      const id = await save({
        ...music,
        title: piece.title as KineticLightSongInput['title'],
      });

      if (!id) {
        return null;
      }

      setArranging(true);
      await arrange({ id, title: piece.title }, piece).catch(() => {});
      setArranging(false);

      return { id, ready: true };
    },
    [arrange, readPicture, save, t]
  );

  return { arranging, error, loading: loading || saving, read };
}

export { useRead };
