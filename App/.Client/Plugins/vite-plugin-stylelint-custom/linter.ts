import fs from 'fs';

import { path as appRoot } from 'app-root-path';

import * as nodePath from 'path';

import glob from 'glob';

import stylelint from 'stylelint';

type LinterProps = Pick<Parameters<typeof stylelint.lint>[number], 'files'> & {
  additionalData?: ReturnType<typeof glob.sync>;
};

const GRACEFUL = {
  column: undefined,
  endColumn: undefined,
  endLine: undefined,
  errored: false,
  line: undefined,
  message: 'errors while linting: no output were provided',
  output: undefined,
  reference: '',
  results: undefined,
  rule: '',
  severity: 'error',
  text: '',
  type: 'unknown error',
};

const TYPES = {
  DEPRECATION: 'deprecation',
  INVALID_OPTION_WARNING: 'invalidOptionWarning',
  PARSE_ERROR: 'parseError',
  WARNING: 'warning',
};

const interpolateMessage = ({
  reference = GRACEFUL.reference,
  rule = GRACEFUL.rule,
  severity = GRACEFUL.severity,
  text = GRACEFUL.text,
}) => {
  let message = `[${severity}]: ${text}`;

  if (rule && !message.includes(rule)) {
    message += ` (${rule})`;
  }

  if (reference) {
    message += ` reference: (${reference})`;
  }

  return message;
};

const linter = async ({ files }: LinterProps) => {
  if (typeof files !== 'string') {
    return GRACEFUL;
  }

  const { errored, output, results } = await stylelint.lint({
    allowEmptyInput: true,
    files,
    fix: true,
    ignorePath: `${appRoot}/.stylelintignore`,
  });

  const basic = {
    ...GRACEFUL,
    errored,
    output,
    results,
  };

  if (!results?.[0]) {
    return basic;
  }

  const [{ deprecations, invalidOptionWarnings, parseErrors, warnings }] =
    results;

  const [deprecation] = deprecations;
  const [invalidOptionWarning] = invalidOptionWarnings;
  const [parseError] = parseErrors;
  const [warning] = warnings;

  if (deprecation) {
    const { text, reference } = deprecation;

    const message = interpolateMessage(deprecation);

    return {
      ...basic,
      message,
      text,
      type: TYPES.DEPRECATION,
      reference,
    };
  }

  if (invalidOptionWarning) {
    const { text } = invalidOptionWarning;

    const message = interpolateMessage(invalidOptionWarning);

    return {
      ...basic,
      message,
      text,
      type: TYPES.INVALID_OPTION_WARNING,
    };
  }

  if (parseError) {
    const { stylelintType } = parseError;

    const message = interpolateMessage(invalidOptionWarning);

    return {
      ...basic,
      message,
      text: stylelintType,
      type: TYPES.PARSE_ERROR,
    };
  }

  if (warning) {
    const { column, endColumn, endLine, line, rule, severity, text } = warning;

    const message = interpolateMessage(warning);

    return {
      ...basic,
      column,
      endColumn,
      endLine,
      line,
      message,
      rule,
      severity,
      text,
      type: TYPES.WARNING,
    };
  }

  return basic;
};

export default linter;
