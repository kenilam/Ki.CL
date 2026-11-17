import React from 'react';

import classNames from 'classnames';

import { Animation, Button, Text } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/use-seen';

import { useOpen } from '@/views/resume/page/article/sections/section/body/mentoring/quotes/context';
import {
  useQuote,
  type Quote,
} from '@/views/resume/page/article/sections/section/body/mentoring/quotes/quote/use-quote';

type Props = Pick<Quote, 'writtenAt'>;

const Body: React.FunctionComponent<Props> = ({ writtenAt }) => {
  const { t } = useTranslation('resume');
  const quote = useQuote(writtenAt);
  const { open, toggle } = useOpen(writtenAt);
  const { ref, seen } = useSeen<HTMLElement>();

  return (
    <>
      <Animation duration='slow' hold in={seen} property='fade'>
        <Text
          className={open ? undefined : 'kicl-line-clamp-2'}
          dense
          is='blockquote'
          ref={ref}
        >
          {quote?.text}
        </Text>
      </Animation>
      <Button
        aria-expanded={open}
        className={classNames(
          'kicl-position-absolute',
          'kicl-inset-0',
          'kicl-inline-size-auto'
        )}
        onClick={toggle}
        unstyled
      >
        <span className='kicl-hidden'>
          {t('action', { context: open ? 'less' : 'more' })}
        </span>
      </Button>
    </>
  );
};

export { Body };
