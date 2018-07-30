const client = require('../db/client');
const all_posts_query = 'SELECT * FROM posts';
const create_post_query = 'INSERT INTO posts(id, title, description) VALUES(now(), ?, ?)';
const find_by_id_query = 'SELECT * FROM posts WHERE id=?';

const dbResponseCallback = (err, res) => {
    if(err) {
        this.failed;
    } else {
        this.success(res);
    }
};

module.exports.all = function(params, failed, success) {
    this.failed = failed;
    this.success = success;
    client.execute(all_posts_query, [], dbResponseCallback);
};

module.exports.create = function(params, failed, success) {
    this.failed = failed;
    this.success = success;
    client.execute(create_post_query, [params.title, params.description], dbResponseCallback);
};

module.exports.find_by_id = function(id, failed, success) {
    this.failed = failed;
    this.success = success;
    client.execute(find_by_id_query, [id], dbResponseCallback);
};
