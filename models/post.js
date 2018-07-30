const client = require('../db/client');
const all_posts_query = 'SELECT * FROM posts';
const create_post_query = 'INSERT INTO posts(id, title, description) VALUES(now(), ?, ?)';

module.exports.all = function(params, failed, success) {
    client.execute(all_posts_query, [], function(err, res) {
        if(err) {
            console.log(err);
        } else {
            success(res);
        }
    });
};

module.exports.create = function(params, failed, success) {
    client.execute(create_post_query, [params.title, params.description], function(err, res) {
        if(err) {
            console.log(err);
            failed();
        } else {
            success();
        }
    });
};
