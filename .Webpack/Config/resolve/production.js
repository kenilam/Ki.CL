import resolve from './development';

delete resolve.alias['react-dom'];

export default resolve;
