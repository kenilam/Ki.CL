const randomId = () => `${
  new Date().getTime()
}_${
  Math.random() * 1000
}_${
  new Date().getMilliseconds()
}_${
  Math.random() * 1000
}`;

export default randomId;
