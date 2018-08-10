const client = require('../db/client');
var bcrypt = require('bcryptjs');

const CREATE_USER_QUERY = 'INSERT INTO users(id, email, name, password) VALUES (now(), ?, ?, ?)';

const dbResponseCallback = (err, res) => {
    this.callBack(err, res);
};


module.exports.create = function(params, callBack) {
    this.callBack = callBack;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);
    client.execute(CREATE_USER_QUERY, [params.email, params.name, hash], dbResponseCallback);
};
