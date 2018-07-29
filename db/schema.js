const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['localhost'], keyspace: 'test'});

create_users_table_query = 'CREATE TABLE IF NOT EXISTS users(id uuid PRIMARY KEY, name text)';
client.execute(create_users_table_query, [], function(err, res){console.log(err, res);});
