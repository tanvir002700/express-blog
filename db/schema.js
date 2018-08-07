const client = require('./client');

queries = [
    'CREATE TABLE IF NOT EXISTS users(id uuid PRIMARY KEY, name text)',
    'CREATE TABLE IF NOT EXISTS posts(id uuid PRIMARY KEY, title text, description text)'
];

queries.forEach(function(query) {
    client.execute(query, [], function(err, res) {
        console.log("Run query.........");
        console.log(query);
    });
});
