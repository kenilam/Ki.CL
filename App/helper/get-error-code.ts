import { CombinedGraphQLErrors } from '@apollo/client';

/** The first `extensions.code` on an Apollo error, such as `TOO_MANY_REQUESTS`. */
const getErrorCode = (error: unknown): string | undefined => {
  if (!CombinedGraphQLErrors.is(error)) {
    return undefined;
  }

  const code = error.errors.find(({ extensions }) => extensions?.code)
    ?.extensions?.code;

  return typeof code === 'string' ? code : undefined;
};

export { getErrorCode };
