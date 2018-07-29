const cassandra = require('cassandra-driver');
module.exports = new cassandra.Client({contactPoints: ['localhost'], keyspace: 'test'});
