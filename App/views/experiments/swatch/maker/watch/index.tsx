import { useEffect } from 'react';

// API
import {
  Kicl_SwatchDocument,
  Kicl_SwatchUpdatedDocument,
  skipToken,
  useQuery,
  useSubscription,
} from 'api/provider';

// Routes
import { useNavigate } from 'design/router';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Constants
import { MAKER, toPath } from '@/views/experiments/swatch/constants';

// Opens a new swatch once its photograph exists, not before, wherever the sheet is.
const Watch: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { pending, setPending } = useMaker();
  const { data } = useQuery(
    Kicl_SwatchDocument,
    pending ? { variables: { id: pending } } : skipToken
  );
  const swatch = data?.swatch;

  useSubscription(Kicl_SwatchUpdatedDocument, {
    skip: !pending,
    variables: { id: pending ?? '' },
  });

  useEffect(() => {
    if (!swatch?.still || swatch.id !== pending) {
      return;
    }

    setPending(null);
    document.getElementById(MAKER)?.hidePopover();
    navigate(toPath(swatch.id));
  }, [navigate, pending, setPending, swatch]);

  return null;
};

export { Watch };
