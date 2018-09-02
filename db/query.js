module.exports.Cassandra = {
  ALL_TABLES: 'SELECT table_name FROM system_schema.tables WHERE keyspace_name=?'
}
module.exports.Post = {
        ALL: 'SELECT * FROM posts',
        CREATE: 'INSERT INTO posts(id, title, description) VALUES(now(), ?, ?)',
        FIND_BY_ID: 'SELECT * FROM posts WHERE id=?',
        UPDATE: 'UPDATE posts SET title=?,description=? WHERE id=?',
        DELETE: 'DELETE FROM posts WHERE id=?'
};

module.exports.User = {
    CREATE: 'INSERT INTO users(id, email, username, password) VALUES(now(), ?, ?, ?)',
    FIND_BY_EMAIL: 'SELECT * FROM users WHERE email=? LIMIT 1 ALLOW FILTERING',
    FIND_BY_USERNAME: 'SELECT * FROM users WHERE username=? LIMIT 1 ALLOW FILTERING',
    FIND_BY_ID: 'SELECT * FROM users WHERE id=? LIMIT 1 ALLOW FILTERING'
};
