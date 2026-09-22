import consensysBlue from './consensys-blue.svg';
import eaSports from './ea-sports.svg';
import googleColored from './google-colored.svg';
import harvard from './harvard.svg';
import instagram from './instagram.svg';
import linkedin from './linkedin.svg';
import metaBlue from './meta-blue.svg';
import miamiHurricanes from './miami-hurricanes.svg';
import mit from './mit.svg';
import ohio from './ohio.svg';
import stanford from './stanford.svg';
import ted from './ted.svg';
import ucBerkeley from './uc-berkeley.svg';
import upwork from './upwork.svg';

const Vectors = {
  consensysBlue,
  eaSports,
  googleColored,
  harvard,
  instagram,
  linkedin,
  metaBlue,
  miamiHurricanes,
  mit,
  ohio,
  stanford,
  ted,
  ucBerkeley,
  upwork,
} as const;

const Names: {
  [name in keyof typeof Vectors]?: keyof typeof Vectors;
} = {};

Object.keys(Vectors).forEach((name) => {
  Names[name] = name;
});

export { Names, Vectors };
