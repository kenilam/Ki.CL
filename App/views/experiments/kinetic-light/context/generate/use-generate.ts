import { useCallback, useEffect, useMemo, useState } from 'react';

// API
import {
  Kicl_KineticLightAllowanceDocument,
  Kicl_KineticLightReadingDocument,
  skipToken,
  useQuery,
} from 'api/provider';

// Readers
import { readSong } from '@/views/experiments/kinetic-light/read/song';
import { useRead } from '@/views/experiments/kinetic-light/read/use-read';

// Readings
import { progressOf } from '@/views/experiments/kinetic-light/progress/message';

// Components
import { valibotResolver, useForm } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useArrange } from '@/views/experiments/kinetic-light/use-arrange';
import { useCooldown } from './use-cooldown';
import { useReadings } from './use-readings';

// Schema
import { startSchema, type StartValues } from './schema';

function useGenerate() {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };
  const { arranging, error, loading, read } = useRead();
  const { running } = useReadings();
  const arrange = useArrange();
  const [watching, setWatching] = useState<string | null>(null);
  const [generated, setGenerated] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const { data: reading } = useQuery(
    Kicl_KineticLightReadingDocument,
    watching ? { variables: { id: watching } } : skipToken
  );
  const watched = reading?.kineticLightReading;
  const choosing =
    arranging || (watched?.status === 'READY' && !watched.arrangement);
  const busy = loading || Boolean(running) || choosing;
  const { data, refetch } = useQuery(Kicl_KineticLightAllowanceDocument);
  const allowance = data?.kineticLightAllowance;
  const spent = allowance?.remaining === 0;
  const seconds = useCooldown(allowance?.nextAllowedAt);
  const cooling = seconds > 0;
  const schema = useMemo(
    () => startSchema(translations.kineticLight.t),
    [translations.kineticLight.t]
  );
  const form = useForm<StartValues>({ resolver: valibotResolver(schema) });

  useEffect(() => {
    if (error) {
      form.setError('file', { message: error });
    }
  }, [error, form]);

  useEffect(() => {
    if (watched?.status !== 'READY') {
      return;
    }

    const done = () => {
      setGenerated({ id: watched.id, title: watched.title });
      setWatching(null);
    };
    const piece = watched.arrangement ? null : readSong(watched);

    if (!piece) {
      done();

      return;
    }

    arrange(watched, piece).catch(done);
  }, [arrange, watched]);

  useEffect(() => {
    if (!busy) {
      void refetch();
    }
  }, [busy, refetch]);

  useEffect(() => {
    if (cooling) {
      form.clearErrors('file');
    }
  }, [cooling, form]);

  const submit = form.handleSubmit(async ({ file }) => {
    setGenerated(null);

    const started = await read(file);

    if (started?.ready) {
      setGenerated({ id: started.id, title: started.title });

      return;
    }

    void refetch();
    setWatching(started?.id ?? null);
  });

  const clear = useCallback(() => {
    form.reset();
    setGenerated(null);
  }, [form]);

  let status: string | null = null;

  if (running?.stage === 'NOTES') {
    status = translations.kineticLight.t('status', { context: 'reading' });
  }

  if (running && running.stage !== 'NOTES') {
    status = progressOf(translations.common.t, running);
  }

  if (choosing) {
    status = translations.common.t('arranging');
  }

  return {
    allowance,
    busy,
    clear,
    cooling,
    form,
    generated,
    running,
    seconds,
    spent,
    status,
    submit,
  };
}

export { useGenerate };
