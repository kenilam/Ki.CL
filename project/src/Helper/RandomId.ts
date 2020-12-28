import * as Spec from '@/Helper/spec';

const RandomId: Spec.RandomId = (prop) => {
  const range = prop?.range || 1;

  return (
    Number(
      `${new Date().getTime()}_${Math.floor(Math.random() * range)}_${Math.floor(
        Math.random() * range
      )}`
    )
  );
}

export default RandomId;
