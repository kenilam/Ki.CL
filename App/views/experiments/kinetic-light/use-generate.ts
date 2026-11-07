import { useEffect, useMemo, useState } from 'react';

// Libraries
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// API
import { Kicl_KineticLightAllowanceDocument, useQuery } from 'api/provider';

// Routes
import { useNavigate } from 'design/router';

// Readers
import { readSong } from '@/views/experiments/kinetic-light/read/song';
import { useRead } from '@/views/experiments/kinetic-light/read/use-read';

// Readings
import { progressOf } from '@/views/experiments/kinetic-light/progress/message';

// Hooks
import { useArrange } from './use-arrange';
import { useCooldown } from './use-cooldown';
import { useReadings } from './use-readings';

// Schema
import { startSchema, type StartValues } from './schema';

// Constants
import { toPath } from './constants';

function useGenerate() {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };
  const navigate = useNavigate();
  const { arranging, error, loading, read } = useRead();
  const { readings, running } = useReadings();
  const arrange = useArrange();
  const [watching, setWatching] = useState<string | null>(null);
  const watched = readings.find(({ id }) => id === watching);
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

    const open = () => navigate(toPath(watched.id));
    const piece = watched.arrangement ? null : readSong(watched);

    if (!piece) {
      open();

      return;
    }

    arrange(watched, piece).catch(open);
  }, [arrange, navigate, watched]);

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
    const started = await read(file);

    if (started?.ready) {
      navigate(toPath(started.id));

      return;
    }

    void refetch();
    setWatching(started?.id ?? null);
  });

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
    cooling,
    form,
    running,
    seconds,
    spent,
    status,
    submit,
  };
}

export { useGenerate };
