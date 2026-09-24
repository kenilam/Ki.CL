import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Form, Layout } from '@/components';

// Partials
import { Allowance } from './allowance';
import { Field } from './field';

// Styles
import './styles.scss';

// Hooks
import type { Sender } from './spec';
import { useComposer } from './use-composer';

// Constants
import { CLASS_NAME } from './constants';

type Props = Sender & {
  dense?: boolean;
  /** The agent is replying, so sending is off. */
  busy?: boolean;
  /** Told what is in the field on every change. */
  onText?: (text: string) => void;
  /** No allowance left, so sending is off until it comes back. */
  spent?: boolean;
  /** Pinned to the bottom of the window, over a backdrop, with a line on top. */
  sticky?: boolean;
};

/** The message field, pinned to the bottom of the window unless `sticky` is off. */
const Composer: React.FunctionComponent<Props> = ({
  busy = false,
  dense,
  error,
  loading,
  onText,
  send,
  spent = false,
  sticky = true,
}) => {
  const { form, submit } = useComposer({ error, onText, send });

  return (
    <Layout autoFlow='row' justifyItems='stretch'>
      <section
        className={classNames(CLASS_NAME, {
          [`${CLASS_NAME}--sticky`]: sticky,
          'kicl-inset-block-end-0': sticky,
          'kicl-position-sticky': sticky,
          'kicl-padding-block-start': sticky,
          'kicl-padding-block-end-wide': sticky,
          'kicl-padding-block-start-wide-tablet-down': sticky,
          'kicl-padding-block-end-widest-tablet-down': sticky,
          'kicl-padding-inline-frame': !dense,
        })}
      >
        <Layout autoFlow='row' justifyItems='stretch'>
          <section
            className={classNames('kicl-margin-inline-auto', {
              'kicl-inline-size-columns-8': !dense,
              'kicl-inline-size-columns-12': dense,
            })}
          >
            <Allowance busy={busy} />
            <Form {...form} onSubmit={submit}>
              <Field
                disabled={busy || loading || spent}
                onEnter={() => void submit()}
                sending={loading}
              />
            </Form>
          </section>
        </Layout>
      </section>
    </Layout>
  );
};

export { CLASS_NAME, Composer };
