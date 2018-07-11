console.log(process.env.NODE_ENV);

export default require(`./${process.env.NODE_ENV}.js`);
