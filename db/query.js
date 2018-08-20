module.exports.Post = {
        ALL: 'SELECT * FROM posts',
        CREATE: 'INSERT INTO posts(id, title, description) VALUES(now(), ?, ?)',
        FIND_BY_ID: 'SELECT * FROM posts WHERE id=?',
        UPDATE: 'UPDATE posts SET title=?,description=? WHERE id=?',
        DELETE: 'DELETE FROM posts WHERE id=?'
};

