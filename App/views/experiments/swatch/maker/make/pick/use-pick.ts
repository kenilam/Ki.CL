// API
import {
  Kicl_NotificationsDocument,
  Kicl_SwatchAllowanceDocument,
  Kicl_SwatchPickDocument,
  useMutation,
} from 'api/provider';

// Routes
import { useNavigate } from 'design/router';

// Helpers
import { closeMaker } from '@/views/experiments/swatch/maker/close';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Constants
import { toPath } from '@/views/experiments/swatch/constants';

const usePick = () => {
  const navigate = useNavigate();
  const { pick: form, setPending, setSending } = useMaker();
  const [pick] = useMutation(Kicl_SwatchPickDocument, {
    refetchQueries: [Kicl_NotificationsDocument, Kicl_SwatchAllowanceDocument],
  });

  const submit = form.handleSubmit(async (values) => {
    setSending(true);

    try {
      const { data } = await pick({ variables: { hex: values.hex } });
      const swatch = data?.swatchPick;

      if (!swatch) {
        return;
      }

      if (!swatch.still) {
        setPending(swatch.id);

        return;
      }

      closeMaker();
      navigate(toPath(swatch.id));
    } catch (error) {
      form.setError('hex', { message: (error as Error).message });
    } finally {
      setSending(false);
    }
  });

  return { form, submit };
};

export { usePick };
