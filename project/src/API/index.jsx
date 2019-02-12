import { isEmpty } from 'Helper';

const { API_URL } = process.env;

const promises = {};
const caches = {};

const request = async ({ path }) => {
  try {
    if (!isEmpty(caches[path])) {
      return caches[path];
    }

    if (isEmpty(promises[path])) {
      promises[path] = fetch(`${API_URL}/api${path}`).then(data => data.json());
    }

    const data = await promises[path];

    caches[path] = data;

    delete promises[path];

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const whichRequest = ({ path }) => request({ path });

const about = () => whichRequest({ path: '/about' });
const works = () => whichRequest({ path: '/works' });
const work = ({ projectId }) => whichRequest({ path: `/works/${projectId}` });

export { about, works, work, caches };
