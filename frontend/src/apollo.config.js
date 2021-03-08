module.exports = {
  client: {
    service: {
      name: 'host.docker.internal',
      url: 'http://host.docker.internal:8000/graphql',
      skipSSLValidation: true,
    },
  },
};
