const { API_URL } = process.env;

const cache = {};

const request = async ({ path }) => {
	cache[path] = await fetch(`${API_URL}/api${path}`).then(data => data.json());

	return cache[path];
};

const whichRequest = ({ path }) => cache[path] || request({ path });

const about = () => whichRequest({ path: '/about' });
const works = () => whichRequest({ path: '/works' });
const work = ({ projectId }) => whichRequest({ path: `/works/${projectId}` });

export { about, works, work, cache };
