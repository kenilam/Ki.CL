export default {
  name: 'Ki.CL',
  localhost: {
    logPrefix: 'Ki.CL',
    host: 'http://localhost',
    port: 3011,
    ui: {
      port: 3031,
      weinre: {
        port: 3032,
      },
    },
  },

  api: {
    host: {
      development: 'http://localhost:3100',
      production: 'https://ki-cl.herokuapp.com',
    },
  },
};
