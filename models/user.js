const bcrypt = require('bcryptjs');
const client = require('../db/client');
const Query = require('../db/query');


module.exports.create = function(params, callBack) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);
    client.execute(Query.User.CREATE, [params.email, params.username, hash], callBack);
};

module.exports.findByEmail = function(email, callBack) {
    client.execute(Query.User.FIND_BY_EMAIL, [email], callBack);
};

module.exports.findById = function(id, callBack) {
    client.execute(Query.User.FIND_BY_ID, [id], callBack);
};

module.exports.findByUsername = function(username, callBack) {
    client.execute(Query.User.FIND_BY_USERNAME, [username], callBack);
};

module.exports.comparePassword = function(candidatePassword, hash, callBack) {
	bcrypt.compare(candidatePassword, hash, callBack);
};
