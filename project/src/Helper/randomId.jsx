const randomId = () => `${
  new Date().getTime()
}_${
  Math.floor(Math.random() * 1000) + 1  
}`;

export default randomId;
