const client = require('../db/client');
const all_posts_query = 'SELECT * FROM posts';
const create_post_query = 'INSERT INTO posts(id, title, description) VALUES(now(), ?, ?)';
const find_by_id_query = 'SELECT * FROM posts WHERE id=?';
const update_post_query = 'UPDATE posts SET title=?,description=? WHERE id=?';

const dbResponseCallback = (err, res) => {
    this.callBack(err, res);
};

module.exports.all = function(params, callBack) {
    this.callBack = callBack;
    client.execute(all_posts_query, [], dbResponseCallback);
};

module.exports.create = function(params, callBack) {
    this.callBack = callBack;
    client.execute(create_post_query, [params.title, params.description], dbResponseCallback);
};

module.exports.find_by_id = function(id, callBack) {
    this.callBack = callBack;
    client.execute(find_by_id_query, [id], dbResponseCallback);
};

module.exports.update = function(id, params, callBack) {
    this.callBack = callBack;
    client.execute(update_post_query, [params.title, params.description, id], dbResponseCallback);
};
