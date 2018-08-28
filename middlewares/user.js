const User = require('../models/user');
const { validationResult } = require('express-validator/check');

module.exports.validationCheckForRegistration = function(req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('users/new', { csrfToken: req.csrfToken(), errors: errors.array() });
    } else {
      next();
    }
};

module.exports.checkDuplicateUserByEmail = function(req, res, next) {
  User.findByEmail(req.body.email, function(err, result) {
    if(result.rows.length || err) {
      req.flash('error', 'User already exist with this email.');
      res.render('users/new', { csrfToken: req.csrfToken() });
    } else {
      next();
    }
  });
};

module.exports.checkDuplicateUserByUserName = function(req, res, next) {
  User.findByUsername(req.body.username, function(err, result) {
    if(result.rows.length || err) {
      req.flash('error', 'User already exist with this username.');
      res.render('users/new', { csrfToken: req.csrfToken() });
    } else {
      next();
    }
  });
};

module.exports.checkPasswordConfirmation = function(req, res, next) {
  if(req.body.password === req.body.password_confirmation) {
    next();
  } else {
    req.flash('error', 'Password not Match.');
    res.render('users/new', { csrfToken: req.csrfToken() });
  }
};
