import { PATH as ME } from '@/views/me/constants';

/** Route segments, under the `me` route. */
const PATH = 'password';
const CONFIRM_PATH = 'confirm';

/** The password page from the root, for what runs outside it. */
const PAGE_PATH = `/${ME}/${PATH}`;

export { CONFIRM_PATH, PAGE_PATH, PATH };
