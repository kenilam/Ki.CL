const RandomId = (): string =>
  `${new Date().getTime()}_${Math.floor(Math.random() * 1000)}_${Math.floor(
    Math.random() * 1000
  )}`;

export default RandomId;
