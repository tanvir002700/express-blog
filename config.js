const config = require('./.env.json');

module.exports = config[process.env.NODE_ENV || 'development'];
