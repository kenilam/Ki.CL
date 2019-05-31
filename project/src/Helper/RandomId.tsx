function RandomId(range: number = 1000): string {
  return (
    `${new Date().getTime()}_${Math.floor(Math.random() * range)}_${Math.floor(
      Math.random() * range
    )}`
  );
}

export default RandomId;
