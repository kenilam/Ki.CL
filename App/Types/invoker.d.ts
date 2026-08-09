import 'react';

/**
 * Invoker commands, until the React types carry them.
 *
 * `commandfor` points a button at another element by id and `command` says what
 * to do to it, so a dialog opens and closes from markup alone — no state, no
 * handler, no ref. The attributes ship in the browser already; what is missing
 * is only the typing, and it is missing in the newest published
 * `@types/react` (19.2.18) as well as the one installed here, so upgrading does
 * not supply it.
 *
 * Delete this file when DefinitelyTyped lands them.
 */

type Command =
  | 'close'
  | 'hide-popover'
  | 'request-close'
  | 'show'
  | 'show-modal'
  | 'show-popover'
  | 'toggle-popover'
  | `--${string}`;

declare module 'react' {
  // Merged into the existing interfaces — no `extends` clause, which has to
  // match the original exactly and is what makes the obvious version fail.
  interface ButtonHTMLAttributes<T> {
    command?: Command;
    commandFor?: string;
  }

  interface InputHTMLAttributes<T> {
    command?: Command;
    commandFor?: string;
  }
}
