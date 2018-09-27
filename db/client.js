const cassandra = require('cassandra-driver');
const dbConfig = require('../config').database;

module.exports = new cassandra.Client(
  { contactPoints: dbConfig.contactPoints, keyspace: dbConfig.keyspace },
);
