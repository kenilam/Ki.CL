import { TITLE_ID } from './constants';

const getRest = () => {
  const heading = document.getElementById(TITLE_ID);
  const header = heading?.closest('header');

  if (!heading || !header) {
    return 0;
  }

  return header.offsetHeight - heading.offsetHeight;
};

export { getRest };
