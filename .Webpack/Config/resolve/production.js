import { path as appRoot } from 'app-root-path';

import fs from 'fs';

import { context } from '!/Config/entry';

const alias = {
    '^': appRoot,
    '~': context,
    assets: `${appRoot}/project/assets`,
    content: `${appRoot}/project/content`
};

fs.readdirSync(context).forEach(dir => {
    const path = `${context}/${dir}`;

    if (!fs.statSync(path).isDirectory()) {
        return;
    }

    alias[dir] = `${context}/${dir}`;
});

const resolve = {
    modules: [`${appRoot}/node_modules`],
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.xml'],
    alias
};

export { resolve };
export default {
    resolve
};
