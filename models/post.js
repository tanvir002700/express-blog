const client = require('../db/client');
const Query = require('../db/query');


module.exports.all = (params, callBack) => {
  client.execute(Query.Post.ALL, [], callBack);
};

module.exports.create = (params, callBack) => {
  client.execute(Query.Post.CREATE, [params.title, params.description], callBack);
};

module.exports.findById = (id, callBack) => {
  client.execute(Query.Post.FIND_BY_ID, [id], callBack);
};

module.exports.update = (id, params, callBack) => {
  client.execute(Query.Post.UPDATE, [params.title, params.description, id], callBack);
};

module.exports.delete = (id, callBack) => {
  client.execute(Query.Post.DELETE, [id], callBack);
};
