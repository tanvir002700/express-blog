const client = require('../db/client');
var Base = require('./base');

const ALL_POSTS_QUERY = 'SELECT * FROM posts';
const CREATE_POST_QUERY = 'INSERT INTO posts(id, title, description) VALUES(now(), ?, ?)';
const FIND_BY_ID_QUERY = 'SELECT * FROM posts WHERE id=?';
const UPDATE_POST_QUERY = 'UPDATE posts SET title=?,description=? WHERE id=?';
const DELETE_POST_QUERY = 'DELETE FROM posts WHERE id=?';

module.exports.all = function(params, callBack) {
    this.callBack = callBack;
    client.execute(ALL_POSTS_QUERY, [], callBack);
};

module.exports.create = function(params, callBack) {
    this.callBack = callBack;
    client.execute(CREATE_POST_QUERY, [params.title, params.description], callBack);
};

module.exports.findById = function(id, callBack) {
    this.callBack = callBack;
    client.execute(FIND_BY_ID_QUERY, [id], callBack);
};

module.exports.update = function(id, params, callBack) {
    this.callBack = callBack;
    client.execute(UPDATE_POST_QUERY, [params.title, params.description, id], callBack);
};

module.exports.delete = function(id, callBack) {
    this.callBack = callBack;
    client.execute(DELETE_POST_QUERY, [id], callBack);
};
