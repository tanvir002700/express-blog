const client = require('./client');

const queries = [
  'CREATE TABLE IF NOT EXISTS users(id uuid, email text, username text, password text, PRIMARY KEY(id, email, username))',
  'CREATE TABLE IF NOT EXISTS posts(id uuid PRIMARY KEY, title text, description text)',
];

let success = 0;

queries.forEach((query) => {
  client.execute(query, [], (_, res) => {
    console.log('Run query.........');
    console.log(query);
    if (res) success += 1;
    if (queries.length === success) {
      process.exit(0);
    }
  });
});
