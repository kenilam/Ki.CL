// Vectors
import amazon from './amazon.svg';
import canva from './canva.svg';
import consensys from './consensys.svg';
import databricks from './databricks.svg';
import epicGames from './epic-games.svg';
import flipboard from './flipboard.svg';
import google from './google.svg';
import ibm from './ibm.svg';
import meta from './meta.svg';
import salesforce from './salesforce.svg';
import shopify from './shopify.svg';
import snapchat from './snapchat.svg';
import spacex from './spacex.svg';
import stripe from './stripe.svg';
import tesla from './tesla.svg';
import tiktok from './tiktok.svg';

const Vectors = {
  amazon,
  canva,
  consensys,
  databricks,
  epicGames,
  flipboard,
  google,
  ibm,
  meta,
  salesforce,
  shopify,
  snapchat,
  spacex,
  stripe,
  tesla,
  tiktok,
} as const;

const Names: {
  [name in keyof typeof Vectors]?: keyof typeof Vectors;
} = {};

Object.keys(Vectors).forEach((name) => {
  Names[name] = name;
});

export { Names, Vectors };
