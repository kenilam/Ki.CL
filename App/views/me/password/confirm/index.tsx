import React from 'react';

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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Layout,
  Spinner,
} from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Constants
import { CONFIRM_COPY as COPY } from '@/views/me/password/constants';

/**
 * Where the emailed link lands. It confirms on a press, not on load: mail
 * scanners open every link in a message, and would confirm it themselves.
 */
const Confirm: React.FunctionComponent = () => {
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

  const onClick = () =>
    void confirm({
      variables: { PasswordChangeConfirm: { id, secret } },
    }).catch(() => undefined);

  return (
    <Card className='kicl-inline-size-max' variant='ghost'>
      <Layout gap='narrow' justifyItems='center'>
        <CardHeader className='kicl-text-align-center'>
          <CardTitle aria-live='polite' className='kicl-font-size' is='h1'>
            {confirmed ? COPY.confirmed : COPY.title}
          </CardTitle>
          <CardDescription>
            {confirmed && COPY.return}
            {invalid && COPY.invalid}
            {!confirmed && !invalid && !checking && COPY.description}
          </CardDescription>
          <Spinner in={checking} position='inline' />
        </CardHeader>
      </Layout>
      {!confirmed && !invalid && !checking && (
        <CardFooter justifyContent='center'>
          <Button disabled={loading} onClick={onClick} size='small'>
            {COPY.confirm}
            {loading ? (
              <Ri.RiLoader4Line aria-hidden className='is-revolving' />
            ) : null}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export { Confirm };
