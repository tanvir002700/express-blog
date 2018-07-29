const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['localhost'], keyspace: 'test'});

queries = [
    'CREATE TABLE IF NOT EXISTS users(id uuid PRIMARY KEY, name text)',
    'CREATE TABLE IF NOT EXISTS posts(id uuid PRIMARY KEY, title text, description text)'
];

queries.forEach(function(query) {
    client.execute(query, [], function(err, res){console.log(err, res);});
});
