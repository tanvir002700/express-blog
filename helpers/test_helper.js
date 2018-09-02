const query = require('../db/query');
const Client = require('../db/client');
const config = require('../config').database;

module.exports.allTablesName = () => {
  Client.execute(query.Cassandra.ALL_TABLES, [config.keyspace], function(err, res) {
    console.log(res);
  });
};
