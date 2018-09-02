const cassandra = require('cassandra-driver');
const db_config = require('../config').database;

module.exports = new cassandra.Client({contactPoints: db_config.contactPoints, keyspace: db_config.keyspace});
