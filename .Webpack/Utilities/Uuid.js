import fs from 'fs';
import { path as appRoot } from 'app-root-path';
import { tmp } from '!/Config/output';
import { IsProd } from '!/Utilities';

const path = `${appRoot}/${tmp}/uuid/`;
class Uuid {

  static get nonce() {
    if (!IsProd) {
      return 'development'
    }

    if (!fs.existsSync(path)) {
      throw new Error(`Uuid not exists - CSP wont work. Please create one in ${path}`)
    }
    const uuidFileName = fs.readdirSync(path)[0];
    const nonce = fs.readFileSync(`${path}/${uuidFileName}`);
    return nonce;
  }
}

export default Uuid;
