import { argv } from 'yargs';

let { env } = argv;

if (!env) {
  env = {};
}

function whichBoolean(type) {
  return Boolean(env[type]) || false;
}

class Arguments {
  static get analyzer() {
    return whichBoolean('analyzer');
  }

  static get debug() {
    return whichBoolean('debug');
  }

  static get noBrowser() {
    return whichBoolean('noBrowser');
  }

  static get noWatch() {
    return whichBoolean('noWatch');
  }

  static get verbose() {
    return whichBoolean('verbose');
  }

  static get noLint() {
    return whichBoolean('noLint');
  }
}

export default Arguments;
