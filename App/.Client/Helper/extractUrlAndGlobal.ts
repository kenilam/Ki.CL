function extractUrlAndGlobal(urlAndGlobal: string) {
  const index = urlAndGlobal.indexOf('@');

  const start = urlAndGlobal.indexOf('[');
  const end = urlAndGlobal.indexOf(']');

  if (
    index <= 0 ||
    index === urlAndGlobal.length - 1 ||
    end <= 0 ||
    start <= 0
  ) {
    throw new Error(`Invalid request '${urlAndGlobal}'`);
  }

  const expression = `\`${urlAndGlobal
    .substring(index + 1)
    .replace('[', '${')
    .replace(']', '}')}\``;
  const name = urlAndGlobal.substring(0, index);

  return [expression, name];
}

export default extractUrlAndGlobal;
