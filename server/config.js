const config = {
  production: {
    ssl: true,
    port: 443,
    hostname: 'example.com',
  },
  development: {
    ssl: false,
    port: 4000,
    hostname: 'localhost',
    database: {
      host: 'ds125318.mlab.com',
      port: 25318,
      name: 'macro'
    }
  }
}

module.exports = config;