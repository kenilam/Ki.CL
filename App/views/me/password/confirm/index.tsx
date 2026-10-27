import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  Kicl_PasswordChangeConfirmDocument,
  Kicl_PasswordChangeLinkDocument,
  skipToken,
  useMutation,
  useQuery,
} from 'api/provider';

// Routes
import { useLocation } from 'design/router';

// Components
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  HyperLink,
  Layout,
  Spinner,
  Status,
} from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Views
import { PATH as HOME_PATH } from '@/views/home';

/**
 * Where the emailed link lands. It confirms on a press, not on load: mail
 * scanners open every link in a message, and would confirm it themselves.
 */
const Confirm: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { t: common } = useTranslation();

  // `#id.secret`, after the hash so the secret is never sent with a page request.
  const [id, secret] = useLocation().hash.slice(1).split('.');

  const [confirm, { data, error, loading }] = useMutation(
    Kicl_PasswordChangeConfirmDocument
  );

  // Asked on load, so a link that was already used doesn't offer to confirm again.
  const { data: link, loading: checking } = useQuery(
    Kicl_PasswordChangeLinkDocument,
    id && secret
      ? {
          fetchPolicy: 'network-only',
          variables: { PasswordChangeLink: { id, secret } },
        }
      : skipToken
  );

  const confirmed = Boolean(data?.PasswordChangeConfirm);
  const invalid =
    !confirmed &&
    (!id || !secret || Boolean(error) || link?.PasswordChangeLink === false);

  const onClick = async () => {
    try {
      await confirm({ variables: { PasswordChangeConfirm: { id, secret } } });
    } catch {
      // The mutation's `error` already shows it.
    }
  };

  if (invalid) {
    return (
      <Card size='max' variant='secondary'>
        <Layout gap='narrow' justifyItems='center'>
          <CardContent>
            <Status
              justifyContent='center'
              headingLevel='h1'
              in
              level='warning'
              message={t('description', { context: 'invalid' })}
              title={t('title', { context: 'invalid' })}
            />
          </CardContent>
        </Layout>
        <CardFooter justifyContent='center'>
          <HyperLink
            lookLikeButton
            size='small'
            to={`/${HOME_PATH}`}
            variant='secondary'
          >
            {t('action', { context: 'home' })}
          </HyperLink>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card size='max' variant='secondary'>
      <Layout gap='narrow' justifyItems='center'>
        <CardHeader className='kicl-text-align-center'>
          <CardTitle aria-live='polite' className='kicl-font-size' is='h1'>
            {t('title', { context: confirmed ? 'confirmed' : 'confirm' })}
          </CardTitle>
          {confirmed || !checking ? (
            <CardDescription>
              {t('description', {
                context: confirmed ? 'confirmed' : 'confirm',
              })}
            </CardDescription>
          ) : null}
          <Spinner in={checking} position='inline' />
        </CardHeader>
      </Layout>
      {!confirmed && !checking && (
        <CardFooter justifyContent='center'>
          <Button
            after={
              loading && (
                <Ri.RiLoader4Line aria-hidden className='is-revolving' />
              )
            }
            disabled={loading}
            onClick={onClick}
            size='small'
          >
            {common('action', { context: 'confirm' })}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export { Confirm };
