const client = require('../db/client');
var bcrypt = require('bcryptjs');

const CREATE_USER_QUERY = 'INSERT INTO users(id, email, name, password) VALUES (now(), ?, ?, ?)';
const FIND_USER_BY_EMAIL_QUERY = 'SELECT * FROM users WHERE email=? LIMIT 1 ALLOW FILTERING';

const FIND_USER_BY_ID_QUERY = 'SELECT * FROM users WHERE id=? LIMIT 1 ALLOW FILTERING';

const dbResponseCallback = (err, res) => {
    this.callBack(err, res);
};


module.exports.create = function(params, callBack) {
    this.callBack = callBack;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);
    client.execute(CREATE_USER_QUERY, [params.email, params.name, hash], dbResponseCallback);
};


module.exports.find_by_email = function(email, callBack) {
    this.callBack = callBack;
    client.execute(FIND_USER_BY_EMAIL_QUERY, [email], dbResponseCallback);
}

module.exports.find_by_id = function(id, callBack) {
    this.callBack = callBack;
    client.execute(FIND_USER_BY_ID_QUERY, [id], dbResponseCallback);
}


module.exports.compare_password = function(candidate_password, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
