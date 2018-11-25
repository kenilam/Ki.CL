const { API_URL } = process.env;

const about = `${API_URL}/api/about`;
const works = `${API_URL}/api/works`;
const work = `${API_URL}/api/works/:projectId`;

export default { about, works, work }
