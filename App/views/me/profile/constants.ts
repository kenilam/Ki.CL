const COPY = {
  title: 'My profile',
  signedInAs: 'Signed in as',
  changePassword: 'Change password',
  firstName: 'First name',
  lastName: 'Last name',
  reset: 'Reset',
  save: 'Save',
  saved: 'Saved',
  cancel: 'Cancel',
  delete: 'Delete',
  deleteAccount: 'Delete account',
  deleteConfirm: 'Delete your account?',
  deleteMessage: 'This cannot be undone. Enter your password to confirm.',
  deleting: 'Deleting your account',
  deletes: 'This deletes:',
  deletesAccount: 'Your name, email and password',
  deletesConversations: 'Your image agent conversations and their pictures',
  deletesEverything:
    'Your account and everything saved with it will be deleted.',
  deletesPortfolios: (count: number) =>
    `Your access to ${count} portfolio piece${count > 1 ? 's' : ''}`,
  yourPassword: 'Password',
};

/** The delete button opens the dialog by this id. */
const DELETE_ID = 'kicl--views--me--delete';

export { COPY, DELETE_ID };
