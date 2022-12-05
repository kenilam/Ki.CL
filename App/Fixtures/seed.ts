import ProductsJSON from '../Static/products.json';

const generateVoteCount = () => {
  return Math.floor(Math.random() * 50 + 15);
};

const PATH = '/seed';

const getSeed = () => {
  const products = [...ProductsJSON].map((product) => ({
    ...product,
    votes: generateVoteCount(),
  }));

  return { products };
};

type Seed = ReturnType<typeof getSeed>;

export { type Seed, PATH };
export default getSeed;
