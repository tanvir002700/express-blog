const query = require('../db/query');
const Client = require('../db/client');
const config = require('../config').database;

const truncateTable = (name) => {
  Client.execute("TRUNCATE "+name, [], function(err, res) {
    console.log(err);
    console.log(res);
  });
};

const allTablesName = (callback) => {
  Client.execute(query.Cassandra.ALL_TABLES, [config.keyspace], function(err, res) {
    res.rows.forEach(function(item){
      callback(item.table_name);
    });
  });
};

module.exports.flushAllTables = () => {
  allTablesName(truncateTable);
};
