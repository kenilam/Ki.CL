const randomId = () => `${
  new Date().getTime()
}_${
  Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)
}`;

export default randomId;
