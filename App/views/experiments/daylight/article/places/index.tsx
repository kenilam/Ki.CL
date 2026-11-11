import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { List, Popover, PopoverContent } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Place } from './place';
import { Trigger } from './trigger';

// Constants
import {
  CLASS_NAME as VIEW,
  PLACES,
} from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__places`;

/**
 * What the drawing shows, in words: each place's local time and whether it
 * is day there. Each row is a link to that place's address, which turns the
 * globe.
 */
const Places: React.FunctionComponent = () => {
  const { t } = useTranslation('daylight');

  return (
    <Popover>
      <nav
        aria-label={t('label', { context: 'places' })}
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-full',
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-12',
          'kicl-padding-inline-frame',
          'kicl-position-relative'
        )}
      >
        <Trigger />
        <PopoverContent
          aria-label={t('label', { context: 'places' })}
          className='kicl-padding'
          placement='block-end'
          variant='secondary'
        >
          <List alignContent='stretch' autoFlow='row'>
            {PLACES.map(({ context }) => {
              return <Place context={context} key={context} />;
            })}
          </List>
        </PopoverContent>
      </nav>
    </Popover>
  );
};

export { Places };
