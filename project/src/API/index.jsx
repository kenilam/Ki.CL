const { API_URL } = process.env;

const cache = {};

const request = async (name, url) => {
    cache[name] = cache[name] || await fetch(url).then(data => data.json());

    return cache[name];
};

const about = () => request('about', `${API_URL}/api/about`);
const works = () => request('works', `${API_URL}/api/works`);
const work = ({ projectId }) => request(`works/${projectId}`, `${API_URL}/api/works/${projectId}`);

export { about, works, work };
