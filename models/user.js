const bcrypt = require('bcryptjs');
const client = require('../db/client');
const Query = require('../db/query');

module.exports.all = (params, callBack) => {
  client.execute(Query.User.ALL, [], callBack);
};

module.exports.create = (params, callBack) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(params.password, salt);
  client.execute(
    Query.User.CREATE,
    [
      params.email,
      params.username,
      hash,
    ],
    callBack,
  );
};

module.exports.findByEmail = (email, callBack) => {
  client.execute(
    Query.User.FIND_BY_EMAIL,
    [email],
    callBack,
  );
};

module.exports.findById = (id, callBack) => {
  client.execute(
    Query.User.FIND_BY_ID,
    [id],
    callBack,
  );
};

module.exports.findByUsername = (username, callBack) => {
  client.execute(
    Query.User.FIND_BY_USERNAME,
    [username],
    callBack,
  );
};

module.exports.comparePassword = (candidatePassword, hash, callBack) => {
  bcrypt.compare(candidatePassword, hash, callBack);
};
