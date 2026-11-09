import React, { useEffect, useId, useRef } from 'react';

// Libraries
import classNames from 'classnames';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import {
  AnimatedText,
  BackLink,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FileInput,
  FormMessage,
  Frame,
  Heading,
  Layout,
  Sheet,
  Text,
} from 'design/components';

// Routes
import { useNavigate } from 'design/router';

// Context
import { useKineticLightContext } from '@/views/experiments/kinetic-light/context';

// Partials
import { Allowance } from '@/views/experiments/kinetic-light/allowance';
import { Backdrop } from '@/views/experiments/kinetic-light/backdrop';
import { Songs } from '@/views/experiments/kinetic-light/songs';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  ACCEPT,
  MAX_FILE_SIZE,
  PATH,
  toPath,
} from '@/views/experiments/kinetic-light/constants';
import { CLASS_NAME } from './constants';

const Contents: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };
  const {
    generate: {
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
    },
    examples,
    songs,
  } = useKineticLightContext();
  const navigate = useNavigate();
  const sheet = useId();
  const title = translations.kineticLight.t('label', { context: 'songs' });
  const generateButton = useRef<HTMLButtonElement>(null);
  const file = useWatch({ control: form.control, name: 'file' });

  useEffect(() => {
    if (!file) {
      return;
    }

    generateButton.current?.focus();
  }, [file]);

  useEffect(() => {
    if (!generated) {
      return;
    }

    navigate(toPath(generated.id));
    clear();
  }, [clear, generated, navigate]);

  return (
    <Layout alignContent='end' justifyContent='stretch' justifyItems='start'>
      <Frame grow>
        <section
          className={classNames(
            CLASS_NAME,
            'kicl--theme--dark',
            'kicl-position-relative'
          )}
        >
          <Backdrop />
          <Layout autoFlow='row' gap='wide' justifyItems='start'>
            <article
              className={classNames(
                `${CLASS_NAME}__words`,
                'kicl-padding-block-extreme',
                'kicl-padding-inline-frame-columns-12',
                'kicl-position-relative',
                'kicl-z-index-raised'
              )}
            >
              <Layout autoFlow='row' gap='narrow' justifyItems='start'>
                <header>
                  <BackLink
                    className='kicl-margin-block-end'
                    label={translations.common.t('experiments')}
                    to={toExperimentsPath(PATH)}
                  />
                  <Heading
                    dense
                    className={classNames(
                      'kicl-font-size-huge',
                      'kicl-line-height-narrower'
                    )}
                    is='h1'
                  >
                    {translations.common.t('experiment', {
                      context: 'kinetic_light',
                    })}
                  </Heading>
                  <Text is='p' dense className='kicl-max-inline-size-columns-5'>
                    {translations.kineticLight.t('lede')}
                  </Text>
                  <Allowance />
                </header>
              </Layout>
              {spent && !busy ? null : (
                <Form
                  {...form}
                  className='kicl-inline-size-columns-5'
                  onSubmit={submit}
                >
                  <Layout
                    alignContent='start'
                    alignItems='start'
                    autoFlow='row'
                    gap='narrow'
                  >
                    <fieldset
                      className='kicl-inline-size-full'
                      disabled={busy || cooling}
                    >
                      <FormField
                        control={form.control}
                        name='file'
                        render={({
                          field: { name, onBlur, onChange, ref },
                        }) => (
                          <FormItem>
                            <FormLabel>
                              {translations.kineticLight.t('label', {
                                context: 'file',
                              })}
                            </FormLabel>
                            <FormControl>
                              <FileInput
                                accept={ACCEPT}
                                name={name}
                                onBlur={onBlur}
                                onChange={(event) =>
                                  onChange(event.target.files?.[0])
                                }
                                ref={ref}
                              />
                            </FormControl>
                            <FormDescription>
                              {translations.kineticLight.t('hint', {
                                context: 'file',
                                size: MAX_FILE_SIZE,
                              })}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        before={
                          busy ? (
                            <Bs.BsArrowClockwise
                              aria-hidden
                              className='is-revolving'
                            />
                          ) : (
                            <Bs.BsStars aria-hidden />
                          )
                        }
                        ref={generateButton}
                        size='small'
                        type='submit'
                      >
                        {translations.kineticLight.t('action', {
                          context: busy ? 'generating' : 'generate',
                        })}
                      </Button>
                      {status ? (
                        <Text is='p' role='status' variant='secondary'>
                          <AnimatedText is='span' key={status} split='word'>
                            {status}
                          </AnimatedText>
                        </Text>
                      ) : null}
                      {cooling && !running ? (
                        <Text is='p' role='status' variant='secondary'>
                          {translations.kineticLight.t('status', {
                            context: 'cooling',
                            count: seconds,
                          })}
                        </Text>
                      ) : null}
                    </fieldset>
                  </Layout>
                </Form>
              )}
              {examples.length || songs.length ? (
                <>
                  <Layout>
                    <Button
                      before={<Bs.BsMusicNoteList aria-hidden />}
                      popoverTarget={sheet}
                      popoverTargetAction='show'
                      size='small'
                      variant='ghost'
                    >
                      {title}
                    </Button>
                  </Layout>
                  <Sheet
                    defaultOpen
                    header={<Heading is='h3'>{title}</Heading>}
                    id={sheet}
                    variant='secondary'
                  >
                    <Songs />
                  </Sheet>
                </>
              ) : null}
            </article>
          </Layout>
        </section>
      </Frame>
    </Layout>
  );
};

export { Contents };
