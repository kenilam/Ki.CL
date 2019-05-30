function RandomNumber( { start = 0, end = 100 } ): number {
  return Math.floor( Math.random() * end ) + start;
}

export default RandomNumber;
