import React from 'react';

// Components
import { Layout, Segmented, SegmentedItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSpent } from '@/views/experiments/swatch/use-spent';

// Context
import { useMaker, type Mode } from '@/views/experiments/swatch/maker/context';

// Partials
import { Pick } from './pick';
import { Upload } from './upload';
import { UploadOption } from './upload-option';

const MODES = {
  pick: <Pick />,
  upload: <Upload />,
};

const Make: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const { mode, setMode } = useMaker();
  const spent = useSpent();
  const shown = spent ? 'pick' : mode;

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-label={t('action', { context: spent ? 'find' : 'make' })}>
        <Segmented
          aria-label={t('label', { context: 'source' })}
          collapse='stack'
          onValueChange={(value) => {
            setMode(value as Mode);
          }}
          value={shown}
        >
          <SegmentedItem value='pick'>
            {t('mode', { context: 'pick' })}
          </SegmentedItem>
          <SegmentedItem disabled={spent} value='upload'>
            <UploadOption />
          </SegmentedItem>
        </Segmented>
        {MODES[shown]}
      </section>
    </Layout>
  );
};

export { Make };
