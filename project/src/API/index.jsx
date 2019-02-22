import { isEmpty } from 'Helper';

const { API_URL } = process.env;

const promises = {};
const caches = {};

const request = async ({ path }) => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    try {
        if (!isEmpty(caches[path])) {
            return caches[path];
        }

        if (isEmpty(promises[path])) {
            promises[path] = fetch(`${API_URL}/api${path}`, {
                mode: 'cors',
                credentials: 'include',
                method: 'GET',
                headers
            }).then(data => data.json());
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
