import {
  Kicl_PasswordChangeConfirmDocument,
  Kicl_PasswordChangeLinkDocument,
  skipToken,
  useMutation,
  useQuery,
} from 'api/provider';

// Routes
import { useLocation } from 'design/router';

/**
 * The emailed link's answer. It confirms on a press, not on load: mail
 * scanners open every link in a message, and would confirm it themselves.
 */
const useConfirm = () => {
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
          variables: { passwordChangeLink: { id, secret } },
        }
      : skipToken
  );

  const confirmed = Boolean(data?.passwordChangeConfirm);
  const invalid =
    !confirmed &&
    (!id || !secret || Boolean(error) || link?.passwordChangeLink === false);

  const onClick = async () => {
    try {
      await confirm({ variables: { passwordChangeConfirm: { id, secret } } });
    } catch {
      // The mutation's `error` already shows it.
    }
  };

  return { checking, confirmed, invalid, loading, onClick };
};

export { useConfirm };
