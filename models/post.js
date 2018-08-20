const client = require('../db/client');
const Query = require('../db/query');


module.exports.all = function(params, callBack) {
    client.execute(Query.Post.ALL, [], callBack);
};

module.exports.create = function(params, callBack) {
    client.execute(Query.Post.CREATE, [params.title, params.description], callBack);
};

module.exports.findById = function(id, callBack) {
    client.execute(Query.Post.FIND_BY_ID, [id], callBack);
};

module.exports.update = function(id, params, callBack) {
    client.execute(Query.Post.UPDATE, [params.title, params.description, id], callBack);
};

module.exports.delete = function(id, callBack) {
    client.execute(Query.Post.DELETE, [id], callBack);
};
