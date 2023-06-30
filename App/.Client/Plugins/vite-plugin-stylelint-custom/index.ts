import { CustomPayload, HMRPayload, isCSSRequest, UserConfig } from 'vite';

import glob from 'glob';

import sass from 'sass';

import linter from './linter';
import template from './template';

import { NAME, NODE_MODULES } from './constants';

type CustomStylelintProps = {
  additionalData?: ReturnType<typeof glob.sync>;
  ignorePatterns?: RegExp[];
};

type CustomStylelint = (
  props: CustomStylelintProps
) => Exclude<UserConfig['plugins'], undefined>[number];

const customStylelint: CustomStylelint = ({
  additionalData = [],
  ignorePatterns = [NODE_MODULES],
}: CustomStylelintProps) => ({
  enforce: 'post',
  name: NAME,
  async transform(code, id) {
    const shouldIgnored = [NODE_MODULES, ...ignorePatterns].some((pattern) =>
      pattern.test(id)
    );

    if (!isCSSRequest(id) || shouldIgnored) {
      return { code, map: null };
    }

    const { errored, message } = await linter({ additionalData, files: id });

    if (!errored) {
      return {
        code: template({ code }),
        map: null,
      };
    }

    this.error(message);
  },
  async handleHotUpdate({ file, server, timestamp }) {
    const { errored, message, line, column } = await linter({ files: file });

    if (!errored) {
      const { css, sourceMap } = sass.compile(file, {
        alertAscii: true,
        sourceMap: true,
        sourceMapIncludeSources: true,
        verbose: true,
      });

      const data: CustomPayload['data'] = {
        content: css,
        id: file,
      };

      if (sourceMap) {
        const JSONString = JSON.stringify(sourceMap);
        const base64 = (Buffer.from(JSONString, 'utf8') || '').toString(
          'base64'
        );
        const sourceMappingURL = `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64} */`;

        data.content = `
          ${css}
          ${JSON.stringify(sourceMap)}
          ${sourceMappingURL}
        `;
      }

      server.ws.send({
        event: NAME,
        type: 'custom',
        data,
      });

      server.ws.send({
        type: 'update',
        updates: [
          {
            acceptedPath: file,
            path: file,
            timestamp,
            type: 'css-update',
          },
        ],
      });
    }

    if (errored) {
      const payload: HMRPayload = {
        type: 'error',
        err: {
          plugin: NAME,
          message,
          id: file,
          stack: file,
        },
      };

      if (line && column) {
        payload.err.loc = {
          file,
          line,
          column,
        };
      }

      server.ws.send(payload);
    }

    return [];
  },
});

export default customStylelint;
