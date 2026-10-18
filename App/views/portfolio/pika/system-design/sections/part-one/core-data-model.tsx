import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Dialog, Heading, Text } from 'design/components';

// Diagrams
import { Diagram } from 'design/components';
import { dataModel } from '@/views/portfolio/pika/system-design/diagrams/data-model';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** Jobs, tasks, attempts and assets. */
const CoreDataModel: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const spec = useMemo(() => dataModel(t), [t]);

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'core_data_model' })}
      </Heading>
      <Diagram opens='diagram-data-model' spec={spec} />
      <Dialog
        aria-label={spec.title}
        className={`${CLASS_NAME}__full`}
        fullScreen
        id='diagram-data-model'
      >
        <Diagram
          className={classNames(
            'kicl-inline-size-columns-12',
            'kicl-margin-inline-auto'
          )}
          spec={spec}
        />
      </Dialog>
      <Text>{t('part_one.core_data_model.lineage')}</Text>
    </>
  );
};

export { CoreDataModel };
