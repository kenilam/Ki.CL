import { useMemo } from 'react';

// API
import {
  Kicl_SwatchAllowanceDocument,
  Kicl_SwatchUploadDocument,
  useMutation,
} from 'api/client';

// Components
import { useForm, valibotResolver } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Schema
import { uploadSchema, type UploadValues } from './schema';

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const useUpload = () => {
  const { t } = useTranslation('swatch');
  const { setPending, setSending } = useMaker();
  const schema = useMemo(() => uploadSchema(t), [t]);
  const form = useForm<UploadValues>({ resolver: valibotResolver(schema) });
  const [upload] = useMutation(Kicl_SwatchUploadDocument, {
    refetchQueries: [Kicl_SwatchAllowanceDocument],
  });

  const submit = form.handleSubmit(async ({ file }) => {
    setSending(true);

    try {
      const data = await toBase64(file);
      const { data: result } = await upload({ variables: { file: { data } } });

      if (result) {
        setPending(result.swatchUpload.id);
      }
    } catch (error) {
      form.setError('file', { message: (error as Error).message });
    } finally {
      setSending(false);
    }
  });

  return { form, submit };
};

export { useUpload };
