import { path as appRoot } from 'app-root-path';

const entry = `./${process.env.NODE_ENV}.jsx`;
const context = `${appRoot}/project/src`;

export { context };
export default {
    entry,
    context
};
